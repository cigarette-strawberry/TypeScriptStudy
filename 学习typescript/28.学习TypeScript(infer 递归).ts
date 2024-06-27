namespace twentyEight {
  type Arr = [1, 2, 3, 4]

  type Reversal<T extends any[]> = T extends [infer First, ...infer rest] ? [...Reversal<rest>, First] : T

  type Recursion = Reversal<Arr>

  // 具体思路 首先使用泛型约束 约束只能传入数组类型的东西  然后从数组中提取第一个，放入新数组的末尾，反复此操作，形成递归 满足结束条件返回该类型
}
