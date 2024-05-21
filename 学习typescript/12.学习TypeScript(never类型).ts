namespace twelve {
  type A = '唱' | '跳' | 'rap' | '篮球' | '两年半'
  function kun(value: A) {
    switch (value) {
      case '唱':
        break
      case '跳':
        break
      case 'rap':
        break
      case '篮球':
        break
      case '两年半':
        break
      default:
        const error: never = value
        break
    }
  }

  kun('rap')
}
