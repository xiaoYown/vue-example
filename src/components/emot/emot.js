module.exports = {
  lib: [
    'e100',
    'e102',
    'e103',
    'e104',
    'e105',
    'e106',
    'e107',
    'e109',
    'e112',
    'e113',
    'e114',
    'e120',
    'e121',
    'e122',
    'e123',
    'e124',
    'e125',
    'e126',
    'e127',
    'e128',
    'e129',
    'e135',
    'e138',
    'e143',
    'e144',
    'e149',
    'e150',
    'e151',
    'e152',
    'e153',
    'e154',
    'e155',
    'e156',
    'e157',
    'e163',
    'e164',
    'e178',
    'e179',
    // 'e180',
    // 'e181',
    // 'e182',
    // 'e183',
    // 'e184',
    // 'e185',
    // 'e187',
    'e4005',
    'e4006',
    'e4007',
    'e4009',
    'e4012',
    'e4018'
  ],
  sameLen (text) {
    let _text = text.replace(/\n/g, '<br>')
    _text = _text.replace(/\s/g, '&nbsp;')

    return _text
  },
  compile (text) {
    let _text = text.replace(/\n/g, '<br>')
    _text = _text.replace(/\s/g, '&nbsp;')
    _text = _text.replace(/\[[a-z0-9]+\]/g, (em) => {
      let src = '/static/em/' + em.replace(/\[|\]/g, '') + '.gif'
      return `<img src="${src}" class="emot_cp">`
    })
    return _text
  }
}
