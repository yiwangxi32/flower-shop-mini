"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function OrdersPage() {
  // 模拟订单数据
  const orders = [
    {
      id: "ORD20230501001",
      date: "2023-05-01",
      status: "unpaid",
      statusText: "待付款",
      totalAmount: 199,
      items: [
        {
          id: 1,
          name: "浪漫玫瑰花束",
          price: 199,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80",
        },
      ],
    },
    {
      id: "ORD20230428002",
      date: "2023-04-28",
      status: "unshipped",
      statusText: "待发货",
      totalAmount: 518,
      items: [
        {
          id: 2,
          name: "向日葵花篮",
          price: 259,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80",
        },
        {
          id: 3,
          name: "混合鲜花礼盒",
          price: 259,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80",
        },
      ],
    },
    {
      id: "ORD20230415003",
      date: "2023-04-15",
      status: "completed",
      statusText: "已完成",
      totalAmount: 399,
      items: [
        {
          id: 4,
          name: "永生花礼盒",
          price: 399,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80",
        },
      ],
    },
  ]

  // 获取URL参数中的状态
  const [activeTab, setActiveTab] = useState("all")

  // 根据状态筛选订单
  const getFilteredOrders = (status: string) => {
    if (status === "all") return orders
    return orders.filter((order) => order.status === status)
  }

  return (
    <div className="flex flex-col min-h-screen pb-16">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-10 flex items-center bg-white p-4 shadow-sm">
        <Link href="/profile" className="mr-4">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-lg font-medium">我的订单</h1>
      </div>

      {/* 订单状态选项卡 */}
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="border-b">
          <TabsList className="flex w-full justify-between rounded-none bg-white p-0">
            <TabsTrigger
              value="all"
              className="flex-1 border-b-2 border-transparent py-2.5 data-[state=active]:border-pink-500"
            >
              全部
            </TabsTrigger>
            <TabsTrigger
              value="unpaid"
              className="flex-1 border-b-2 border-transparent py-2.5 data-[state=active]:border-pink-500"
            >
              待付款
            </TabsTrigger>
            <TabsTrigger
              value="unshipped"
              className="flex-1 border-b-2 border-transparent py-2.5 data-[state=active]:border-pink-500"
            >
              待发货
            </TabsTrigger>
            <TabsTrigger
              value="shipped"
              className="flex-1 border-b-2 border-transparent py-2.5 data-[state=active]:border-pink-500"
            >
              待收货
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="flex-1 border-b-2 border-transparent py-2.5 data-[state=active]:border-pink-500"
            >
              已完成
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="p-4">
          {getFilteredOrders("all").length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <p className="mt-4 text-gray-500">暂无订单</p>
            </div>
          ) : (
            <div className="space-y-4">
              {getFilteredOrders("all").map((order) => (
                <div key={order.id} className="rounded-lg border bg-white p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">订单号：{order.id}</div>
                    <div className="text-sm font-medium text-pink-600">{order.statusText}</div>
                  </div>
                  <div className="mt-3 space-y-3">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex">
                        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="ml-3 flex flex-1 flex-col">
                          <div className="flex justify-between">
                            <h3 className="text-sm font-medium">{item.name}</h3>
                            <p className="text-sm font-medium">¥{item.price}</p>
                          </div>
                          <div className="mt-auto flex items-center justify-between">
                            <span className="text-xs text-gray-500">x{item.quantity}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t pt-4">
                    <div className="text-sm">共{order.items.reduce((sum, item) => sum + item.quantity, 0)}件商品</div>
                    <div className="text-sm">
                      实付：<span className="font-bold text-pink-600">¥{order.totalAmount}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    {order.status === "unpaid" && (
                      <>
                        <Button variant="outline" size="sm">
                          取消订单
                        </Button>
                        <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                          去付款
                        </Button>
                      </>
                    )}
                    {order.status === "unshipped" && (
                      <Button variant="outline" size="sm">
                        提醒发货
                      </Button>
                    )}
                    {order.status === "shipped" && (
                      <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                        确认收货
                      </Button>
                    )}
                    {order.status === "completed" && (
                      <>
                        <Button variant="outline" size="sm">
                          申请售后
                        </Button>
                        <Button variant="outline" size="sm">
                          评价
                        </Button>
                      </>
                    )}
                    <Button variant="outline" size="sm">
                      查看详情
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="unpaid" className="p-4">
          {getFilteredOrders("unpaid").length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <p className="mt-4 text-gray-500">暂无待付款订单</p>
            </div>
          ) : (
            <div className="space-y-4">
              {getFilteredOrders("unpaid").map((order) => (
                <div key={order.id} className="rounded-lg border bg-white p-4">
                  {/* 订单内容与全部订单相同 */}
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">订单号：{order.id}</div>
                    <div className="text-sm font-medium text-pink-600">{order.statusText}</div>
                  </div>
                  <div className="mt-3 space-y-3">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex">
                        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="ml-3 flex flex-1 flex-col">
                          <div className="flex justify-between">
                            <h3 className="text-sm font-medium">{item.name}</h3>
                            <p className="text-sm font-medium">¥{item.price}</p>
                          </div>
                          <div className="mt-auto flex items-center justify-between">
                            <span className="text-xs text-gray-500">x{item.quantity}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t pt-4">
                    <div className="text-sm">共{order.items.reduce((sum, item) => sum + item.quantity, 0)}件商品</div>
                    <div className="text-sm">
                      实付：<span className="font-bold text-pink-600">¥{order.totalAmount}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    <Button variant="outline" size="sm">
                      取消订单
                    </Button>
                    <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                      去付款
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* 其他状态的TabsContent类似，这里省略 */}
        <TabsContent value="unshipped" className="p-4">
          {/* 待发货订单内容 */}
        </TabsContent>
        <TabsContent value="shipped" className="p-4">
          {/* 待收货订单内容 */}
        </TabsContent>
        <TabsContent value="completed" className="p-4">
          {/* 已完成订单内容 */}
        </TabsContent>
      </Tabs>

      {/* 版权声明 */}
      <div className="mt-auto px-4 text-center text-xs text-gray-400">
        <p>© {new Date().getFullYear()} 花店小程序</p>
        <p className="mt-1">版权所有，侵权必究</p>
      </div>
    </div>
  )
}
