"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"

export default function CartPage() {
  // 模拟购物车数据
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "浪漫玫瑰花束",
      price: 199,
      image: "/placeholder.svg?height=100&width=100",
      quantity: 1,
      selected: true,
    },
    {
      id: 2,
      name: "向日葵花篮",
      price: 259,
      image: "/placeholder.svg?height=100&width=100",
      quantity: 1,
      selected: true,
    },
  ])

  const [allSelected, setAllSelected] = useState(true)

  // 计算总价
  const totalPrice = cartItems
    .filter((item) => item.selected)
    .reduce((sum, item) => sum + item.price * item.quantity, 0)

  // 计算总数量
  const totalQuantity = cartItems.filter((item) => item.selected).reduce((sum, item) => sum + item.quantity, 0)

  // 更新商品数量
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  // 删除商品
  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  // 选择/取消选择商品
  const toggleSelectItem = (id: number) => {
    const newCartItems = cartItems.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
    setCartItems(newCartItems)
    setAllSelected(newCartItems.every((item) => item.selected))
  }

  // 全选/取消全选
  const toggleSelectAll = () => {
    const newSelected = !allSelected
    setAllSelected(newSelected)
    setCartItems(cartItems.map((item) => ({ ...item, selected: newSelected })))
  }

  const router = useRouter()

  return (
    <div className="flex flex-col min-h-screen pb-24">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-10 flex items-center bg-white p-4 shadow-sm">
        <Link href="/" className="mr-4">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-lg font-medium">购物车</h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center p-4">
          <div className="rounded-full bg-gray-100 p-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-gray-400"
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
          </div>
          <p className="mt-4 text-gray-500">购物车是空的</p>
          <Button asChild className="mt-4 bg-pink-500 hover:bg-pink-600">
            <Link href="/">去逛逛</Link>
          </Button>
        </div>
      ) : (
        <>
          {/* 购物车列表 */}
          <div className="flex-1 p-4">
            <div className="mb-4 flex items-center">
              <Checkbox id="select-all" checked={allSelected} onCheckedChange={toggleSelectAll} />
              <label htmlFor="select-all" className="ml-2 text-sm">
                全选
              </label>
            </div>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex rounded-lg border bg-white p-3">
                  <div className="flex items-center pr-3">
                    <Checkbox checked={item.selected} onCheckedChange={() => toggleSelectItem(item.id)} />
                  </div>
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="ml-3 flex flex-1 flex-col">
                    <div className="flex justify-between">
                      <h3 className="text-sm font-medium">{item.name}</h3>
                      <button onClick={() => removeItem(item.id)} className="text-gray-400">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-sm font-bold text-pink-600">¥{item.price}</span>
                      <div className="flex items-center">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="flex h-6 w-6 items-center justify-center rounded border text-xs"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="mx-2 min-w-[1.5rem] text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="flex h-6 w-6 items-center justify-center rounded border text-xs"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
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

          {/* 底部结算栏 */}
          <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between border-t bg-white p-4">
            <div>
              <div className="flex items-baseline">
                <span className="text-sm">合计：</span>
                <span className="text-lg font-bold text-pink-600">¥{totalPrice}</span>
              </div>
              <div className="text-xs text-gray-500">共{totalQuantity}件商品</div>
            </div>
            <Button
              className="rounded-full bg-pink-500 px-8 hover:bg-pink-600"
              disabled={totalQuantity === 0}
              onClick={() => router.push("/checkout")}
            >
              去结算
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
