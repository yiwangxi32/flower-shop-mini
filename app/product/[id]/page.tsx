"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Heart, Share2, ShoppingCart, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProductPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)
  const [isLiked, setIsLiked] = useState(false)

  // 模拟产品数据
  const product = {
    id: Number.parseInt(params.id),
    name: "浪漫玫瑰花束",
    price: 199,
    originalPrice: 259,
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    description: "精选19朵红玫瑰，象征着爱的告白。搭配满天星和尤加利叶，赠送精美贺卡。",
    details: "花材：19朵红玫瑰、满天星、尤加利叶\n包装：高档包装纸、丝带\n附赠：精美贺卡\n适用场景：表白、纪念日、生日",
    specifications: "尺寸：约50cm×30cm\n保鲜：5-7天\n储存：常温避光处",
    reviews: [
      {
        id: 1,
        user: "张先生",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "2023-05-15",
        content: "花很新鲜，包装精美，女朋友非常喜欢！",
      },
      {
        id: 2,
        user: "李女士",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4,
        date: "2023-05-10",
        content: "送货很及时，花的品质不错，就是包装稍微有点皱。",
      },
    ],
  }

  const incrementQuantity = () => setQuantity(quantity + 1)
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const toggleLike = () => setIsLiked(!isLiked)

  return (
    <div className="flex flex-col min-h-screen pb-16">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-10 flex items-center justify-between bg-white p-4 shadow-sm">
        <Link href="/" className="rounded-full bg-white/80 p-1.5 shadow-sm">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-lg font-medium">商品详情</h1>
        <button className="rounded-full bg-white/80 p-1.5 shadow-sm">
          <Share2 className="h-5 w-5" />
        </button>
      </div>

      {/* 商品图片轮播 */}
      <div className="relative h-80 w-full bg-gray-100">
        <Image src={product.images[0] || "/placeholder.svg"} alt={product.name} fill className="object-contain" />
        <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-1">
          <div className="h-1.5 w-4 rounded-full bg-pink-500"></div>
          <div className="h-1.5 w-1.5 rounded-full bg-pink-200"></div>
          <div className="h-1.5 w-1.5 rounded-full bg-pink-200"></div>
        </div>
        <button onClick={toggleLike} className="absolute right-4 top-4 rounded-full bg-white/80 p-2 shadow-sm">
          <Heart className={`h-5 w-5 ${isLiked ? "fill-pink-500 text-pink-500" : "text-gray-400"}`} />
        </button>
      </div>

      {/* 商品信息 */}
      <div className="bg-white p-4">
        <div className="flex items-baseline">
          <span className="text-xl font-bold text-pink-600">¥{product.price}</span>
          <span className="ml-2 text-sm line-through text-gray-400">¥{product.originalPrice}</span>
        </div>
        <h2 className="mt-2 text-lg font-bold">{product.name}</h2>
        <p className="mt-1 text-sm text-gray-500">{product.description}</p>

        <div className="mt-4 flex items-center justify-between rounded-lg bg-pink-50 p-2 text-sm">
          <div className="flex items-center">
            <Truck className="mr-2 h-4 w-4 text-pink-500" />
            <span>今日下单，预计明日送达</span>
          </div>
          <span className="text-pink-500">免运费</span>
        </div>
      </div>

      {/* 数量选择 */}
      <div className="mt-2 flex items-center justify-between bg-white p-4">
        <span className="text-sm">购买数量</span>
        <div className="flex items-center">
          <button
            onClick={decrementQuantity}
            className="flex h-7 w-7 items-center justify-center rounded border text-sm"
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="mx-3 min-w-[2rem] text-center">{quantity}</span>
          <button
            onClick={incrementQuantity}
            className="flex h-7 w-7 items-center justify-center rounded border text-sm"
          >
            +
          </button>
        </div>
      </div>

      {/* 商品详情选项卡 */}
      <div className="mt-2 bg-white p-4">
        <Tabs defaultValue="details">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">商品详情</TabsTrigger>
            <TabsTrigger value="specs">规格参数</TabsTrigger>
            <TabsTrigger value="reviews">用户评价</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="mt-4">
            <div className="text-sm leading-relaxed whitespace-pre-line">{product.details}</div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Image
                src="/placeholder.svg?height=200&width=200"
                alt="商品详情图"
                width={200}
                height={200}
                className="rounded-lg"
              />
              <Image
                src="/placeholder.svg?height=200&width=200"
                alt="商品详情图"
                width={200}
                height={200}
                className="rounded-lg"
              />
            </div>
          </TabsContent>
          <TabsContent value="specs" className="mt-4">
            <div className="text-sm leading-relaxed whitespace-pre-line">{product.specifications}</div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-4">
            <div className="space-y-4">
              {product.reviews.map((review) => (
                <div key={review.id} className="border-b pb-4">
                  <div className="flex items-center">
                    <Image
                      src={review.avatar || "/placeholder.svg"}
                      alt={review.user}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div className="ml-2">
                      <div className="text-sm font-medium">{review.user}</div>
                      <div className="flex text-yellow-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-3 w-3 ${i < review.rating ? "fill-current" : "text-gray-300"}`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <div className="ml-auto text-xs text-gray-400">{review.date}</div>
                  </div>
                  <p className="mt-2 text-sm">{review.content}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* 版权声明 */}
      <div className="mt-4 px-4 text-center text-xs text-gray-400">
        <p>© {new Date().getFullYear()} 花店小程序</p>
        <p className="mt-1">版权所有，侵权必究</p>
      </div>

      {/* 底部操作栏 */}
      <div className="fixed bottom-0 left-0 right-0 flex items-center border-t bg-white p-2">
        <div className="flex flex-1 items-center">
          <Link href="/" className="flex flex-col items-center px-3">
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
          <Link href="/cart" className="flex flex-col items-center px-3">
            <div className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-400" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 text-xs text-white">
                2
              </span>
            </div>
            <span className="mt-1 text-xs">购物车</span>
          </Link>
        </div>
        <div className="flex flex-1">
          <Button variant="outline" className="flex-1 rounded-l-full border-pink-500 text-pink-500 hover:bg-pink-50">
            加入购物车
          </Button>
          <Button className="flex-1 rounded-r-full bg-pink-500 hover:bg-pink-600">立即购买</Button>
        </div>
      </div>
    </div>
  )
}
