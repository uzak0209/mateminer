import { LifestyleWizard } from "@/components/forms/LifestyleWizard";

export default function LifestylePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 flex flex-col items-center justify-center">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">ライフスタイル診断</h1>
        <p className="text-gray-600">
          全20問中、主要な項目にお答えください。<br/>
          この結果をもとに、AIが相性の良いルームメイトを提案します。
        </p>
      </div>
      
      <LifestyleWizard />
    </div>
  );
}