"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Copy, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function WechatPaymentPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [countdown, setCountdown] = useState(900) // 15分钟倒计时
  const [isChecking, setIsChecking] = useState(false)

  // 模拟订单数据
  const orderData = {
    orderNumber: "ORD" + Date.now().toString().slice(-8),
    amount: 458,
    qrCode: "/placeholder.svg?height=200&width=200",
  }

  useEffect(() => {
    // 倒计时
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

  // 格式化倒计时
  const formatCountdown = () => {
    const minutes = Math.floor(countdown / 60)
    const seconds = countdown % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  // 复制订单号
  const copyOrderNumber = () => {
    navigator.clipboard.writeText(orderData.orderNumber)
    toast({
      description: "订单号已复制到剪贴板",
    })
  }

  // 检查支付状态
  const checkPaymentStatus = () => {
    setIsChecking(true)

    // 模拟支付成功
    setTimeout(() => {
      setIsChecking(false)
      router.push("/payment/success")
    }, 1500)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-10 flex items-center bg-white p-4 shadow-sm">
        <Link href="/checkout" className="mr-4">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-lg font-medium">微信支付</h1>
      </div>

      <div className="flex-1 p-4">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="text-center">
            <h2 className="text-lg font-bold">¥{orderData.amount.toFixed(2)}</h2>
            <p className="mt-1 text-sm text-gray-500">
              订单号：{orderData.orderNumber}
              <button onClick={copyOrderNumber} className="ml-1 inline-flex items-center text-pink-500">
                <Copy className="h-3 w-3" />
              </button>
            </p>
          </div>

          <div className="my-6 flex flex-col items-center">
            <div className="relative mb-4 h-48 w-48 overflow-hidden rounded-lg border-4 border-green-500 p-2">
              <Image
                src={orderData.qrCode || "/placeholder.svg"}
                alt="微信支付二维码"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-sm text-gray-600">请使用微信扫一扫，扫描二维码完成支付</p>
            <p className="mt-2 text-sm text-gray-500">
              二维码有效期：<span className="text-pink-500">{formatCountdown()}</span>
            </p>
          </div>

          <div className="mt-6 flex justify-center space-x-4">
            <Button variant="outline" className="flex items-center" onClick={checkPaymentStatus} disabled={isChecking}>
              <RefreshCw className={`mr-1 h-4 w-4 ${isChecking ? "animate-spin" : ""}`} />
              {isChecking ? "检查中..." : "我已完成支付"}
            </Button>
            <Button asChild variant="outline">
              <Link href="/checkout">取消支付</Link>
            </Button>
          </div>

          <div className="mt-8 rounded-lg bg-gray-50 p-4">
            <h3 className="mb-2 text-sm font-medium">支付帮助</h3>
            <ol className="list-inside list-decimal space-y-1 text-xs text-gray-600">
              <li>打开微信，点击右上角"+"，选择"扫一扫"</li>
              <li>将摄像头对准上方二维码即可</li>
              <li>如果您已经完成支付，请点击"我已完成支付"按钮</li>
              <li>如果支付遇到问题，可以尝试刷新页面或选择其他支付方式</li>
            </ol>
          </div>
        </div>
      </div>

      {/* 版权声明 */}
      <div className="mt-4 px-4 text-center text-xs text-gray-400">
        <p>© {new Date().getFullYear()} 花店小程序</p>
        <p className="mt-1">版权所有，侵权必究</p>
      </div>
    </div>
  )
}
