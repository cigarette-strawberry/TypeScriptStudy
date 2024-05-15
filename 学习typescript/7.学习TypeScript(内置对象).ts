namespace T7 {
  function promise(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      resolve(1)
      //   reject(false)
    })
  }

  promise()
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })

  // HTML(元素名称)Element HTMLElement Element
  let div1: NodeList = document.querySelectorAll('div')
  let div2: NodeListOf<HTMLDivElement | HTMLElement> = document.querySelectorAll('div footer')

  let local: Storage = localStorage
  let session: Storage = sessionStorage
  let loca: Location = location
  let cookie: string = document.cookie
}
