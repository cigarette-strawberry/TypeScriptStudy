namespace twentySeven {
  // infer 是把当前类型提取出来 下面的三元运算符 存在即返回
  // ...取的是多项 使用infer 取多项 不使用则不会进行提取
  type arr = ['a', 'b', 'c']
  // ------------------------提取头部元素-----------------------------

  type First<T extends any[]> = T extends [infer First, ...any[]] ? First : []
  type f = First<arr>
  // 类型参数 T 通过extends 约束 只能是数组类型，然后通过infer 声明局部 First 变量做提取，后面的元素可以是任意类型，然后把局部变量返回

  // ------------------------提取尾部元素-----------------------------

  type Last<T extends any[]> = T extends [...any[], infer Last] ? Last : []
  type l = Last<arr>

  // ------------------------剔除第一个元素 Shift-----------------------------

  type shift<T extends any[]> = T extends [unknown, ...infer shift] ? shift : []
  type s = shift<arr>
  // 思路就是 我们除了第一个的元素把其他的剩余元素声明成一个变量 直接返回 就实现了我们的要求 剔除第一个元素

  // ------------------------剔除尾部元素 pop-----------------------------
  type pop<T extends any[]> = T extends [...infer pop, unknown] ? pop : []
  type p = pop<arr>
}
