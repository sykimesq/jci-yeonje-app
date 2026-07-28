export default function Footer() {
  return (
    <footer className="border-t border-jci-border bg-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <div className="font-bold text-jci-800">부산연제청년회의소</div>
            <div className="text-sm text-jci-muted mt-1">
              〶47537 부산시 연제구 거제대로214번길 6 (경남APT상가 2층 5호)
            </div>
            <div className="text-sm text-jci-muted">
              TEL: 051)861-0066 / FAX: 051)867-0110
            </div>
          </div>
          <div className="text-center md:text-right text-sm text-jci-muted">
            <p>© {new Date().getFullYear()} 부산연제청년회의소</p>
            <p className="mt-1">All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
