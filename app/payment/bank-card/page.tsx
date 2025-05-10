"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, CreditCard, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

export default function BankCardPaymentPage() {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  })

  // 模拟订单数据
  const orderAmount = 458

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // 格式化卡号
    if (name === "cardNumber") {
      const formatted = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
      setFormData({ ...formData, [name]: formatted })
      return
    }

    // 格式化有效期
    if (name === "expiryDate") {
      const cleaned = value.replace(/\D/g, "")
      let formatted = cleaned
      if (cleaned.length > 2) {
        formatted = cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4)
      }
      setFormData({ ...formData, [name]: formatted })
      return
    }

    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // 模拟支付处理
    setTimeout(() => {
      setIsProcessing(false)
      router.push("/payment/success")
    }, 2000)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-10 flex items-center bg-white p-4 shadow-sm">
        <Link href="/checkout" className="mr-4">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-lg font-medium">银行卡支付</h1>
      </div>

      <div className="flex-1 p-4">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-6 text-center">
            <h2 className="text-lg font-bold">¥{orderAmount.toFixed(2)}</h2>
            <p className="mt-1 text-sm text-gray-500">请填写您的银行卡信息完成支付</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">卡号</Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  className="pl-10"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  maxLength={19}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardHolder">持卡人姓名</Label>
              <Input
                id="cardHolder"
                name="cardHolder"
                placeholder="请输入持卡人姓名"
                value={formData.cardHolder}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">有效期 (MM/YY)</Label>
                <Input
                  id="expiryDate"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  maxLength={5}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">安全码</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    id="cvv"
                    name="cvv"
                    type="password"
                    placeholder="CVV"
                    className="pl-10"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    maxLength={3}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600" disabled={isProcessing}>
                {isProcessing ? "处理中..." : "确认支付"}
              </Button>
            </div>
          </form>

          <div className="mt-8 rounded-lg bg-gray-50 p-4">
            <h3 className="mb-2 text-sm font-medium">安全提示</h3>
            <ul className="list-inside list-disc space-y-1 text-xs text-gray-600">
              <li>本系统使用加密技术保护您的银行卡信息</li>
              <li>请确保您在安全的网络环境下进行支付</li>
              <li>我们不会存储您的完整卡号和安全码</li>
              <li>如有疑问，请联系客服</li>
            </ul>
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
