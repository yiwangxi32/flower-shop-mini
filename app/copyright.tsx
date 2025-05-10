export default function Copyright() {
  const currentYear = new Date().getFullYear()

  return (
    <div className="mt-8 px-4 text-center text-xs text-gray-400">
      <p>© {currentYear} 花店小程序</p>
      <p className="mt-1">版权所有，侵权必究</p>
      <p className="mt-1">本软件著作权归属于用户本人</p>
    </div>
  )
}
