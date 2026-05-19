const GITHUB_OWNER = 'yiliukha'
const GITHUB_REPO  = 'Strucode'
const APP_NAME     = 'Strucode'
const PWA_URL      = 'https://yiliukha.github.io/Strucode/'

export default {
  async fetch(request, env) {
    const ua = request.headers.get('User-Agent') || ''

    // Android / iOS → PWA
    if (/Android|iPhone|iPad|iPod/i.test(ua)) {
      return Response.redirect(PWA_URL, 302)
    }

    // Detect desktop OS
    let osKey, filename
    if (/Windows NT/i.test(ua)) {
      osKey = 'windows'
      filename = `${APP_NAME}-windows.zip`
    } else if (/Macintosh|Mac OS X/i.test(ua)) {
      osKey = 'mac'
      filename = `${APP_NAME}-mac.zip`
    } else {
      osKey = 'linux'
      filename = `${APP_NAME}-linux.zip`
    }

    // Try to sync latest build from GitHub Releases
    let githubOk = false
    try {
      const ghRes = await fetch(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases/latest`,
        {
          headers: {
            Authorization: `Bearer ${env.GITHUB_TOKEN}`,
            Accept: 'application/vnd.github+json',
            'User-Agent': 'CF-Worker/1.0',
          },
        }
      )

      if (ghRes.ok) {
        githubOk = true
        const release = await ghRes.json()
        const asset = release.assets.find(a => a.name === filename)

        if (asset) {
          // Read cached metadata from R2
          const metaObj = await env.R2.get('metadata.json')
          const meta = metaObj ? JSON.parse(await metaObj.text()) : {}

          // Download only if asset was updated since last cache
          if (meta[osKey]?.updated_at !== asset.updated_at) {
            const fileRes = await fetch(asset.url, {
              headers: {
                Authorization: `Bearer ${env.GITHUB_TOKEN}`,
                Accept: 'application/octet-stream',
                'User-Agent': 'CF-Worker/1.0',
              },
            })

            if (fileRes.ok) {
              await env.R2.put(filename, fileRes.body, {
                httpMetadata: { contentType: 'application/zip' },
              })
              meta[osKey] = { updated_at: asset.updated_at }
              await env.R2.put('metadata.json', JSON.stringify(meta), {
                httpMetadata: { contentType: 'application/json' },
              })
            }
          }
        }
      }
    } catch (_) {
      // GitHub недоступний — віддамо з R2 кешу нижче
    }

    // Serve from R2 (актуальна версія або останній кеш якщо GitHub недоступний)
    const obj = await env.R2.get(filename)
    if (!obj) {
      return new Response(
        githubOk
          ? 'Білд для цієї платформи ще не зібраний'
          : 'GitHub недоступний і кешу немає',
        { status: githubOk ? 404 : 503 }
      )
    }

    return new Response(obj.body, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-cache',
      },
    })
  },
}
