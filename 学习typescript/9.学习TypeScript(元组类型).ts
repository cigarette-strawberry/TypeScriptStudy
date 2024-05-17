namespace nine {
  const arr: [x: number, y: string, z: boolean] = [1, '2', true]

  arr[0] = 1
  arr[1] = '1'
  arr[2] = false

  arr.push(1)
  //   arr.push(undefined)

  console.log(arr)

  type TupleType = (typeof arr)[0]
  type TupleType2 = (typeof arr)['length']
}
