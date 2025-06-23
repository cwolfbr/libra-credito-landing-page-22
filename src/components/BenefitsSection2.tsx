import React from 'react';

const BenefitsSection2: React.FC = () => {
  const rates = [
    {
      type: "CEI Libra",
      rate: "1,19%",
      period: "ao mês",
      color: "bg-green-500",
      textColor: "text-green-500"
    },
    {
      type: "SFH",
      rate: "2,24%",
      period: "ao mês",
      color: "bg-red-500",
      textColor: "text-red-500",
      label: "Consignado"
    },
    {
      type: "Crédito pessoal",
      rate: "6,72%",
      period: "ao mês",
      color: "bg-red-600",
      textColor: "text-red-600"
    },
    {
      type: "Cheque especial",
      rate: "6,74%",
      period: "ao mês",
      color: "bg-red-700",
      textColor: "text-red-700"
    },
    {
      type: "Cartão de crédito",
      rate: "14,84%",
      period: "ao mês",
      color: "bg-red-800",
      textColor: "text-red-800"
    }
  ];

  return (
    <div className="bg-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Main Content */}
        <div className="text-center mb-12">
          {/* Professional Image */}
          <div className="mb-8 relative">
            <div className="w-32 h-40 mx-auto rounded-xl overflow-hidden shadow-lg">
              <img 
                src="/api/placeholder/200/250" 
                alt="Profissional sorrindo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Badge */}
          <div className="inline-block bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            Crédito a partir de
          </div>

          {/* Main Rate */}
          <div className="mb-8">
            <div className="text-6xl font-bold text-libra-blue mb-2">1,19%</div>
            <div className="text-gray-600 text-lg">ao mês</div>
          </div>

          {/* Highlight Text */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              O crédito da Libra é{' '}
              <span className="text-green-500">sempre a melhor escolha:</span>
            </h2>
          </div>
        </div>

        {/* Rates Comparison */}
        <div className="space-y-4 mb-12">
          {rates.map((rate, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full ${rate.color}`}></div>
                <div>
                  <div className="font-medium text-gray-800">{rate.type}:</div>
                  {rate.label && (
                    <div className="text-sm text-gray-500">{rate.label}</div>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className={`font-bold text-lg ${rate.textColor}`}>
                  {rate.rate}
                </div>
                <div className="text-sm text-gray-500">{rate.period}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="bg-gray-100 rounded-2xl p-6 text-center">
          <h3 className="text-xl font-bold text-libra-blue mb-2">
            Libra na mídia:
          </h3>
          
          {/* Media Icons */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-libra-blue rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">L</span>
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-gray-800">
                    Libra simplifica processo
                  </div>
                  <div className="text-xs text-gray-600">
                    para empréstimo com garantia de imóvel
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">G1</span>
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-gray-800">
                    A Libra Crédito tem soluções
                  </div>
                  <div className="text-xs text-gray-600">
                    financeiras com as menores taxas no pós-pandemia
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">BN</span>
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-gray-800">
                    Libra Crédito oferece
                  </div>
                  <div className="text-xs text-gray-600">
                    empréstimo de baixo custo e personalizado
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">R</span>
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-gray-800">
                    A revolução do crédito
                  </div>
                  <div className="text-xs text-gray-600">
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection2;