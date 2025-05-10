"use client"

import Link from "next/link"
import Image from "next/image"
import {
  Bell,
  ChevronRight,
  CreditCard,
  Gift,
  Heart,
  HelpCircle,
  MapPin,
  Package,
  Settings,
  ShoppingBag,
  Truck,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ProfilePage() {
  // 模拟用户数据
  const user = {
    name: "张三",
    avatar: "/placeholder.svg?height=80&width=80",
    level: "黄金会员",
    points: 520,
  }

  // 模拟订单数据
  const orderCounts = {
    unpaid: 1,
    unshipped: 2,
    shipped: 0,
    completed: 5,
  }

  const menuItems = [
    { icon: <Heart className="h-5 w-5" />, label: "我的收藏", link: "/favorites" },
    { icon: <MapPin className="h-5 w-5" />, label: "收货地址", link: "/address" },
    { icon: <CreditCard className="h-5 w-5" />, label: "支付管理", link: "/payment" },
    { icon: <Bell className="h-5 w-5" />, label: "消息通知", link: "/notifications" },
    { icon: <HelpCircle className="h-5 w-5" />, label: "帮助中心", link: "/help" },
    { icon: <Settings className="h-5 w-5" />, label: "设置", link: "/settings" },
  ]

  return (
    <div className="flex flex-col min-h-screen pb-16 bg-gray-50">
      {/* 用户信息 */}
      <div className="bg-gradient-to-r from-pink-500 to-pink-400 p-6 text-white">
        <div className="flex items-center">
          <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-white">
            <Image src={user.avatar || "/placeholder.svg"} alt={user.name} fill className="object-cover" />
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-bold">{user.name}</h2>
            <div className="mt-1 flex items-center">
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">{user.level}</span>
              <span className="ml-2 text-xs">积分: {user.points}</span>
            </div>
          </div>
          <Button variant="outline" size="sm" className="ml-auto border-white text-white hover:bg-white/20">
            <User className="mr-1 h-4 w-4" />
            编辑
          </Button>
        </div>
      </div>

      {/* 我的订单 */}
      <Card className="mx-4 -mt-4 border-none shadow-md">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">我的订单</h3>
            <Link href="/orders" className="flex items-center text-xs text-gray-500">
              全部订单 <ChevronRight className="ml-1 h-3 w-3" />
            </Link>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-2 text-center">
            <Link href="/orders?status=unpaid" className="flex flex-col items-center">
              <div className="relative">
                <ShoppingBag className="h-6 w-6 text-gray-600" />
                {orderCounts.unpaid > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 text-xs text-white">
                    {orderCounts.unpaid}
                  </span>
                )}
              </div>
              <span className="mt-1 text-xs">待付款</span>
            </Link>
            <Link href="/orders?status=unshipped" className="flex flex-col items-center">
              <div className="relative">
                <Package className="h-6 w-6 text-gray-600" />
                {orderCounts.unshipped > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 text-xs text-white">
                    {orderCounts.unshipped}
                  </span>
                )}
              </div>
              <span className="mt-1 text-xs">待发货</span>
            </Link>
            <Link href="/orders?status=shipped" className="flex flex-col items-center">
              <div className="relative">
                <Truck className="h-6 w-6 text-gray-600" />
                {orderCounts.shipped > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 text-xs text-white">
                    {orderCounts.shipped}
                  </span>
                )}
              </div>
              <span className="mt-1 text-xs">待收货</span>
            </Link>
            <Link href="/orders?status=completed" className="flex flex-col items-center">
              <Gift className="h-6 w-6 text-gray-600" />
              <span className="mt-1 text-xs">已完成</span>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* 会员卡 */}
      <div className="mx-4 mt-4">
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-300 p-4 text-white shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">会员专享特权</h3>
              <p className="mt-1 text-sm text-white/80">尊享会员折扣与专属服务</p>
            </div>
            <Button variant="outline" size="sm" className="border-white text-white hover:bg-white/20">
              查看详情
            </Button>
          </div>
          <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-white/10"></div>
          <div className="absolute -bottom-4 -right-4 h-16 w-16 rounded-full bg-white/10"></div>
        </div>
      </div>

      {/* 菜单列表 */}
      <div className="mx-4 mt-4 space-y-4">
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {menuItems.map((item, index) => (
                <Link key={index} href={item.link} className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-50 text-pink-500">
                      {item.icon}
                    </span>
                    <span className="ml-3 text-sm">{item.label}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
              ))}
            </div>
          </CardContent>
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
            className="h-6 w-6 text-pink-500"
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
