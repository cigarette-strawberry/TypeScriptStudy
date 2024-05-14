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
}
