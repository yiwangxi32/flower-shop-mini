"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight, CreditCard, MapPin, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState("wechat")
  const [isProcessing, setIsProcessing] = useState(false)

  // 模拟订单数据
  const orderData = {
    items: [
      {
        id: 1,
        name: "浪漫玫瑰花束",
        price: 199,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: 2,
        name: "向日葵花篮",
        price: 259,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    subtotal: 458,
    shipping: 0,
    total: 458,
    address: {
      name: "张三",
      phone: "138****1234",
      address: "北京市朝阳区某某街道某某小区1号楼1单元101",
    },
  }

  const handleSubmitOrder = async () => {
    setIsProcessing(true)

    // 模拟支付处理
    setTimeout(() => {
      // 根据不同支付方式跳转到对应的支付页面
      if (paymentMethod === "wechat") {
        router.push("/payment/wechat")
      } else if (paymentMethod === "alipay") {
        router.push("/payment/alipay")
      } else {
        router.push("/payment/bank-card")
      }
    }, 1000)
  }

  return (
    <div className="flex flex-col min-h-screen pb-24">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-10 flex items-center bg-white p-4 shadow-sm">
        <Link href="/cart" className="mr-4">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-lg font-medium">确认订单</h1>
      </div>

      <div className="flex-1 bg-gray-50 p-4">
        {/* 收货地址 */}
        <Link href="/address" className="mb-4 flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
          <div className="flex items-start">
            <MapPin className="mr-3 h-5 w-5 flex-shrink-0 text-pink-500" />
            <div>
              <div className="flex items-center">
                <span className="font-medium">{orderData.address.name}</span>
                <span className="ml-2 text-sm text-gray-500">{orderData.address.phone}</span>
              </div>
              <p className="mt-1 text-sm text-gray-600">{orderData.address.address}</p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </Link>

        {/* 订单商品 */}
        <div className="mb-4 rounded-lg bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-base font-medium">订单商品</h2>
          <div className="space-y-3">
            {orderData.items.map((item) => (
              <div key={item.id} className="flex">
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
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
          <div className="mt-3 flex justify-between border-t pt-3 text-sm">
            <span>共{orderData.items.reduce((sum, item) => sum + item.quantity, 0)}件商品</span>
            <span>
              小计：<span className="font-bold text-pink-600">¥{orderData.subtotal}</span>
            </span>
          </div>
        </div>

        {/* 配送方式 */}
        <div className="mb-4 rounded-lg bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-medium">配送方式</h2>
            <div className="text-sm">
              <span className="text-gray-500">快递免邮</span>
            </div>
          </div>
        </div>

        {/* 支付方式 */}
        <div className="mb-4 rounded-lg bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-base font-medium">支付方式</h2>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
            <div className="flex items-center justify-between rounded-md border p-3">
              <div className="flex items-center">
                <RadioGroupItem value="wechat" id="wechat" />
                <Label htmlFor="wechat" className="ml-2 flex items-center">
                  <Image src="/placeholder.svg?height=24&width=24" alt="微信支付" width={24} height={24} />
                  <span className="ml-2">微信支付</span>
                </Label>
              </div>
              <span className="text-xs text-green-600">推荐</span>
            </div>
            <div className="flex items-center justify-between rounded-md border p-3">
              <div className="flex items-center">
                <RadioGroupItem value="alipay" id="alipay" />
                <Label htmlFor="alipay" className="ml-2 flex items-center">
                  <Image src="/placeholder.svg?height=24&width=24" alt="支付宝" width={24} height={24} />
                  <span className="ml-2">支付宝</span>
                </Label>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-md border p-3">
              <div className="flex items-center">
                <RadioGroupItem value="bank-card" id="bank-card" />
                <Label htmlFor="bank-card" className="ml-2 flex items-center">
                  <CreditCard className="h-5 w-5 text-blue-500" />
                  <span className="ml-2">银行卡支付</span>
                </Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        {/* 订单备注 */}
        <div className="mb-4 rounded-lg bg-white p-4 shadow-sm">
          <h2 className="mb-2 text-base font-medium">订单备注</h2>
          <textarea
            placeholder="选填，请填写与订单相关的备注信息"
            className="w-full rounded-md border p-2 text-sm"
            rows={2}
          ></textarea>
        </div>

        {/* 订单金额 */}
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>商品金额</span>
              <span>¥{orderData.subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>运费</span>
              <span>{orderData.shipping === 0 ? "免运费" : `¥${orderData.shipping}`}</span>
            </div>
            <div className="flex justify-between border-t pt-2 text-base font-bold">
              <span>实付金额</span>
              <span className="text-pink-600">¥{orderData.total}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 版权声明 */}
      <div className="mt-4 px-4 text-center text-xs text-gray-400">
        <p>© {new Date().getFullYear()} 花店小程序</p>
        <p className="mt-1">版权所有，侵权必究</p>
      </div>

      {/* 底部结算栏 */}
      <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between border-t bg-white p-4">
        <div className="flex items-center text-sm">
          <Shield className="mr-1 h-4 w-4 text-green-500" />
          <span>支付安全保障</span>
        </div>
        <div className="flex items-center">
          <div className="mr-3 text-right">
            <div className="text-sm">实付金额</div>
            <div className="text-lg font-bold text-pink-600">¥{orderData.total}</div>
          </div>
          <Button
            className="rounded-full bg-pink-500 px-8 hover:bg-pink-600"
            onClick={handleSubmitOrder}
            disabled={isProcessing}
          >
            {isProcessing ? "处理中..." : "提交订单"}
          </Button>
        </div>
      </div>
    </div>
  )
}
