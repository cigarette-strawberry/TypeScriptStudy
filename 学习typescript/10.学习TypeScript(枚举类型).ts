namespace ten {
  enum Types {
    Red = 2,
    Green,
    BLue
  }

  console.log(Types.Red, Types.Green, Types.BLue)

  // ---------------------------------------------------------

  const red = 'Red'

  enum Types1 {
    Red = 'red',
    Green = 'green',
    BLue = 'blue'
  }

  console.log(Types1[red], Types1.Green, Types1.BLue)

  // ---------------------------------------------------------

  enum Types2 {
    Age = 12,
    Red = 'red',
    Green = 'green',
    BLue = 'blue'
  }

  interface A {
    age: Types2.Age
  }

  const a: A = {
    age: Types2.Age
    // age: 12
  }

  console.log(a)

  console.log(Types2.Age, Types2.Red, Types2.Green, Types2.BLue)

  // ---------------------------------------------------------

  enum Types3 {
    No = 'No',
    Yes = 1
  }

  if (Types3.Yes === 1) {
    console.log(Types3.No, Types3.Yes)
  }

  // ---------------------------------------------------------

  enum Enum {
    fall
  }
  const value = Enum.fall
  const key = Enum[value]
  console.log(`key:${key},value:${value}`)

  // ---------------------------------------------------------

  // enum定义性别
  enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
  }

  // Gender 枚举定义了三个可能的性别值:male、female 和 other。你可以像使用常规变量一样使用这个枚举
  let person1: { name: string; gender: Gender } = {
    name: 'John',
    gender: Gender.Male
  }

  let person2: { name: string; gender: Gender } = {
    name: 'Jane',
    gender: Gender.Female
  }

  let person3: { name: string; gender: Gender } = {
    name: 'Sam',
    gender: Gender.Other
  }

  /**
   * 1.代码更加语义化,更容易理解性别的含义。
   * 2.可以限制性别的值域,避免出现无效的性别值。
   * 3.可以在类型检查时发现错误,如尝试使用无效的性别值。
   */
}
