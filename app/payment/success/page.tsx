"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { CheckCircle2, ChevronRight, Home, Package } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PaymentSuccessPage() {
  const [countdown, setCountdown] = useState(5)

  // 模拟订单数据
  const orderData = {
    orderNumber: "ORD" + Date.now().toString().slice(-8),
    amount: 458,
    paymentMethod: "微信支付",
    paymentTime: new Date().toLocaleString(),
  }

  useEffect(() => {
    // 倒计时自动跳转
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex-1 p-4">
        <div className="mt-8 rounded-lg bg-white p-6 shadow-sm">
          <div className="flex flex-col items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-12 w-12 text-green-500" />
            </div>
            <h1 className="mt-4 text-xl font-bold">支付成功</h1>
            <p className="mt-2 text-center text-sm text-gray-500">您的订单已支付成功，我们将尽快为您安排发货</p>
          </div>

          <div className="mt-6 space-y-4 rounded-lg bg-gray-50 p-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">订单编号</span>
              <span>{orderData.orderNumber}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">支付金额</span>
              <span className="font-medium">¥{orderData.amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">支付方式</span>
              <span>{orderData.paymentMethod}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">支付时间</span>
              <span>{orderData.paymentTime}</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col space-y-3">
            <Button asChild className="flex items-center justify-between bg-pink-500 hover:bg-pink-600">
              <Link href={`/orders?status=unshipped`}>
                <span className="flex items-center">
                  <Package className="mr-2 h-5 w-5" />
                  查看订单
                </span>
                <ChevronRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">
                <Home className="mr-2 h-5 w-5" />
                返回首页 ({countdown}s)
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* 版权声明 */}
      <div className="mt-auto px-4 py-8 text-center text-xs text-gray-400">
        <p>© {new Date().getFullYear()} 花店小程序</p>
        <p className="mt-1">版权所有，侵权必究</p>
      </div>
    </div>
  )
}
