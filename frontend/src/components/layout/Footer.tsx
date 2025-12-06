export function Footer() {
  return (
    <footer className="bg-gray-50 border-t py-12 text-sm text-gray-500">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h4 className="font-bold text-lg text-blue-600">🏠 UniRoom</h4>
          <p>
            大学生のための<br />
            ルームメイトファースト型<br />
            お部屋探しプラットフォーム
          </p>
        </div>
        
        <div>
          <h5 className="font-bold mb-4 text-gray-900">サービス</h5>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">ルームメイト検索</a></li>
            <li><a href="#" className="hover:underline">大学別掲示板</a></li>
            <li><a href="#" className="hover:underline">成功事例インタビュー</a></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold mb-4 text-gray-900">サポート</h5>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">よくある質問</a></li>
            <li><a href="#" className="hover:underline">お問い合わせ</a></li>
            <li><a href="#" className="hover:underline">運営会社</a></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold mb-4 text-gray-900">法的表記</h5>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">利用規約</a></li>
            <li><a href="#" className="hover:underline">プライバシーポリシー</a></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t text-center">
        <p>© 2025 UniRoom. All rights reserved.</p>
      </div>
    </footer>
  );
}