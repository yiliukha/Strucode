/**
 * Localized courses for UI. Source: COURSES in content.js.
 * EN overlays: COURSE_EN_PLAIN (titles, desc) + optional COURSE_EN_DEEP (theory, challenge copy, test strings).
 */
(function () {
  let _enById = null;

  function _cloneCourse(course) {
    try {
      return structuredClone(course);
    } catch {
      return JSON.parse(JSON.stringify(course));
    }
  }

  function _applyPlain(course, plain) {
    const c = _cloneCourse(course);
    const dkey = `${c.id}||desc`;
    if (plain[dkey]) c.desc = plain[dkey];
    for (const mod of c.modules || []) {
      const mk = `${c.id}|${mod.id}`;
      if (plain[mk]) mod.title = plain[mk];
      for (const les of mod.lessons || []) {
        const lk = `${c.id}|${mod.id}|${les.id}`;
        if (plain[lk]) les.title = plain[lk];
      }
    }
    return c;
  }

  function _applyDeep(course, deep) {
    if (!deep) return course;
    for (const mod of course.modules || []) {
      for (const les of mod.lessons || []) {
        const k = `${course.id}|${mod.id}|${les.id}`;
        const d = deep[k];
        if (!d) continue;
        if (d.theory) les.theory = d.theory;
        if (d.challenges && les.challenges) {
          for (const ch of les.challenges) {
            const o = d.challenges[ch.id];
            if (!o) continue;
            if (o.title != null) ch.title = o.title;
            if (o.prompt != null) ch.prompt = o.prompt;
            if (o.starterCode != null) ch.starterCode = o.starterCode;
            if (o.tests && ch.tests && o.tests.length) {
              o.tests.forEach((ot, i) => {
                if (!ch.tests[i]) return;
                if (ot.desc != null) ch.tests[i].desc = ot.desc;
                if (ot.expected != null) ch.tests[i].expected = ot.expected;
                if (ot.expression != null) ch.tests[i].expression = ot.expression;
              });
            }
          }
        }
      }
    }
    return course;
  }

  function _buildEnById() {
    if (_enById) return _enById;
    const plain = typeof window !== 'undefined' ? window.COURSE_EN_PLAIN : null;
    const deep = typeof window !== 'undefined' && window.COURSE_EN_DEEP ? window.COURSE_EN_DEEP : null;
    if (!plain || typeof COURSES === 'undefined') {
      _enById = null;
      return null;
    }
    _enById = {};
    for (const id of Object.keys(COURSES)) {
      let c = _applyPlain(COURSES[id], plain);
      if (deep && typeof deep === 'object') c = _applyDeep(c, deep);
      _enById[id] = c;
    }
    return _enById;
  }

  function invalidateCourseL10nCache() {
    _enById = null;
  }

  function getCourseForUi(id) {
    if (!id || typeof COURSES === 'undefined') return undefined;
    const raw = COURSES[id];
    if (!raw) return undefined;
    if (typeof getLang === 'function' && getLang() === 'en') {
      const map = _buildEnById();
      return map && map[id] ? map[id] : raw;
    }
    return raw;
  }

  function getCoursesForUi() {
    if (typeof COURSES === 'undefined') return [];
    if (typeof getLang === 'function' && getLang() === 'en') {
      const map = _buildEnById();
      if (!map) return Object.values(COURSES);
      return Object.keys(COURSES).map(k => map[k] || COURSES[k]);
    }
    return Object.values(COURSES);
  }

  window.invalidateCourseL10nCache = invalidateCourseL10nCache;
  window.getCourseForUi = getCourseForUi;
  window.getCoursesForUi = getCoursesForUi;
})();
