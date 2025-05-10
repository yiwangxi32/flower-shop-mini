import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, Heart, ShoppingBag } from "lucide-react"

export default function HomePage() {
  // 模拟花店产品数据
  const featuredProducts = [
    {
      id: 1,
      name: "浪漫玫瑰花束",
      price: 199,
      image: "/placeholder.svg?height=200&width=200",
      description: "精选19朵红玫瑰，象征着爱的告白",
    },
    {
      id: 2,
      name: "向日葵花篮",
      price: 259,
      image: "/placeholder.svg?height=200&width=200",
      description: "明亮的向日葵，带来温暖与阳光",
    },
    {
      id: 3,
      name: "混合鲜花礼盒",
      price: 299,
      image: "/placeholder.svg?height=200&width=200",
      description: "精美礼盒装，多种鲜花组合",
    },
    {
      id: 4,
      name: "永生花礼盒",
      price: 399,
      image: "/placeholder.svg?height=200&width=200",
      description: "永不凋谢的美丽，持久的祝福",
    },
  ]

  const categories = [
    { id: 1, name: "鲜花花束", icon: "💐" },
    { id: 2, name: "礼品花篮", icon: "🧺" },
    { id: 3, name: "永生花", icon: "🌹" },
    { id: 4, name: "绿植盆栽", icon: "🪴" },
    { id: 5, name: "婚礼花艺", icon: "💒" },
  ]

  return (
    <main className="flex flex-col min-h-screen pb-16">
      {/* 顶部搜索栏 */}
      <div className="sticky top-0 z-10 bg-white p-4 shadow-sm">
        <div className="relative">
          <input
            type="text"
            placeholder="搜索鲜花、礼品..."
            className="w-full rounded-full bg-gray-100 px-4 py-2 pl-10 text-sm"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* 轮播图 */}
      <div className="relative h-40 w-full bg-pink-100">
        <Image src="/placeholder.svg?height=160&width=400" alt="花店促销活动" fill className="object-cover" />
        <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-1">
          <div className="h-1.5 w-4 rounded-full bg-pink-500"></div>
          <div className="h-1.5 w-1.5 rounded-full bg-pink-200"></div>
          <div className="h-1.5 w-1.5 rounded-full bg-pink-200"></div>
        </div>
      </div>

      {/* 分类导航 */}
      <div className="grid grid-cols-5 gap-2 bg-white p-4">
        {categories.map((category) => (
          <Link key={category.id} href={`/category/${category.id}`} className="flex flex-col items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-50 text-xl">
              {category.icon}
            </div>
            <span className="mt-1 text-xs">{category.name}</span>
          </Link>
        ))}
      </div>

      {/* 热门推荐 */}
      <div className="mt-4 px-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold">热门推荐</h2>
          <Link href="/products" className="flex items-center text-xs text-gray-500">
            查看更多 <ChevronRight className="ml-1 h-3 w-3" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {featuredProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <Card className="overflow-hidden border-none shadow-sm">
                <div className="relative h-40 w-full">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                  <button className="absolute right-2 top-2 rounded-full bg-white/80 p-1.5">
                    <Heart className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
                <CardContent className="p-2">
                  <h3 className="line-clamp-1 text-sm font-medium">{product.name}</h3>
                  <p className="mt-1 text-sm font-bold text-pink-600">¥{product.price}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* 新品上市 */}
      <div className="mt-6 px-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold">新品上市</h2>
          <Link href="/new-arrivals" className="flex items-center text-xs text-gray-500">
            查看更多 <ChevronRight className="ml-1 h-3 w-3" />
          </Link>
        </div>
        <Card className="overflow-hidden">
          <div className="relative h-32 w-full">
            <Image src="/placeholder.svg?height=128&width=400" alt="新品上市" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/40 to-transparent"></div>
            <div className="absolute bottom-3 left-3 text-white">
              <h3 className="text-lg font-bold">春季新品</h3>
              <p className="text-sm">限时8折优惠</p>
            </div>
          </div>
        </Card>
      </div>

      {/* 版权声明 */}
      <div className="mt-8 px-4 text-center text-xs text-gray-400">
        <p>© {new Date().getFullYear()} 花店小程序</p>
        <p className="mt-1">版权所有，侵权必究</p>
      </div>

      {/* 底部导航 */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-around border-t bg-white py-2">
        <Link href="/" className="flex flex-col items-center">
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
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span className="mt-1 text-xs">首页</span>
        </Link>
        <Link href="/category" className="flex flex-col items-center">
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
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
          <span className="mt-1 text-xs">分类</span>
        </Link>
        <Link href="/cart" className="flex flex-col items-center">
          <div className="relative">
            <ShoppingBag className="h-6 w-6 text-gray-400" />
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
    </main>
  )
}
