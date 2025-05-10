import Link from "next/link"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"

export default function CategoryPage() {
  // 模拟分类数据
  const categories = [
    {
      id: 1,
      name: "鲜花花束",
      icon: "💐",
      subcategories: [
        { id: 101, name: "玫瑰花束", image: "/placeholder.svg?height=100&width=100" },
        { id: 102, name: "百合花束", image: "/placeholder.svg?height=100&width=100" },
        { id: 103, name: "混合花束", image: "/placeholder.svg?height=100&width=100" },
        { id: 104, name: "向日葵花束", image: "/placeholder.svg?height=100&width=100" },
        { id: 105, name: "康乃馨花束", image: "/placeholder.svg?height=100&width=100" },
        { id: 106, name: "郁金香花束", image: "/placeholder.svg?height=100&width=100" },
      ],
    },
    {
      id: 2,
      name: "礼品花篮",
      icon: "🧺",
      subcategories: [
        { id: 201, name: "开业花篮", image: "/placeholder.svg?height=100&width=100" },
        { id: 202, name: "庆典花篮", image: "/placeholder.svg?height=100&width=100" },
        { id: 203, name: "商务花篮", image: "/placeholder.svg?height=100&width=100" },
        { id: 204, name: "探望花篮", image: "/placeholder.svg?height=100&width=100" },
      ],
    },
    {
      id: 3,
      name: "永生花",
      icon: "🌹",
      subcategories: [
        { id: 301, name: "永生花礼盒", image: "/placeholder.svg?height=100&width=100" },
        { id: 302, name: "永生花玻璃罩", image: "/placeholder.svg?height=100&width=100" },
        { id: 303, name: "永生花小熊", image: "/placeholder.svg?height=100&width=100" },
      ],
    },
    {
      id: 4,
      name: "绿植盆栽",
      icon: "🪴",
      subcategories: [
        { id: 401, name: "室内绿植", image: "/placeholder.svg?height=100&width=100" },
        { id: 402, name: "多肉植物", image: "/placeholder.svg?height=100&width=100" },
        { id: 403, name: "办公室绿植", image: "/placeholder.svg?height=100&width=100" },
        { id: 404, name: "观叶植物", image: "/placeholder.svg?height=100&width=100" },
      ],
    },
    {
      id: 5,
      name: "婚礼花艺",
      icon: "💒",
      subcategories: [
        { id: 501, name: "新娘手捧花", image: "/placeholder.svg?height=100&width=100" },
        { id: 502, name: "婚礼布置", image: "/placeholder.svg?height=100&width=100" },
        { id: 503, name: "胸花", image: "/placeholder.svg?height=100&width=100" },
      ],
    },
  ]

  return (
    <div className="flex flex-col min-h-screen pb-16">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-10 flex items-center bg-white p-4 shadow-sm">
        <Link href="/" className="mr-4">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-lg font-medium">商品分类</h1>
      </div>

      <div className="flex flex-1">
        {/* 左侧分类导航 */}
        <div className="w-1/4 bg-gray-50">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`#category-${category.id}`}
              className="flex flex-col items-center py-4 text-center"
            >
              <div className="text-xl">{category.icon}</div>
              <span className="mt-1 text-xs">{category.name}</span>
            </Link>
          ))}
        </div>

        {/* 右侧子分类 */}
        <div className="w-3/4 p-4">
          {categories.map((category) => (
            <div key={category.id} id={`category-${category.id}`} className="mb-6">
              <h2 className="mb-3 text-base font-bold">{category.name}</h2>
              <div className="grid grid-cols-3 gap-3">
                {category.subcategories.map((subcategory) => (
                  <Link
                    key={subcategory.id}
                    href={`/category/${category.id}/subcategory/${subcategory.id}`}
                    className="flex flex-col items-center"
                  >
                    <div className="relative h-20 w-20 overflow-hidden rounded-lg">
                      <Image
                        src={subcategory.image || "/placeholder.svg"}
                        alt={subcategory.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="mt-1 text-center text-xs">{subcategory.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 版权声明 */}
      <div className="mt-4 px-4 text-center text-xs text-gray-400">
        <p>© {new Date().getFullYear()} 花店小程序</p>
        <p className="mt-1">版权所有，侵权必究</p>
      </div>

      {/* 底部导航 */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-around border-t bg-white py-2">
        <Link href="/" className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span className="mt-1 text-xs">首页</span>
        </Link>
        <Link href="/category" className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-pink-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
          <span className="mt-1 text-xs">分类</span>
        </Link>
        <Link href="/cart" className="flex flex-col items-center">
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 text-xs text-white">
              2
            </span>
          </div>
          <span className="mt-1 text-xs">购物车</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span className="mt-1 text-xs">我的</span>
        </Link>
      </div>
    </div>
  )
}
