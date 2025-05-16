import React, { useState } from 'react';
import { 
  DollarSign, CreditCard, TrendingUp, Wallet,
  PieChart, BarChart2, Download, Filter
} from 'lucide-react';
import TransactionList from '../components/finance/TransactionList';
import MetricsCard from '../components/dashboard/MetricsCard';
import ChartComponent from '../components/dashboard/ChartComponent';
import { mockTransactions, mockFinanceChart } from '../utils/mockData';

const Finance: React.FC = () => {
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);

  const handleAddTransaction = () => {
    setIsAddingTransaction(true);
  };

  // Calculate financial metrics
  const totalRevenue = mockTransactions
    .filter(t => t.type !== 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = mockTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const balance = totalRevenue - totalExpenses;
  
  const tithesTotal = mockTransactions
    .filter(t => t.type === 'tithe')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-display font-bold text-gray-800 dark:text-white mb-2">
          Finanças
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Gerencie receitas, despesas e relatórios financeiros.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricsCard
          title="Receitas Totais"
          value={totalRevenue}
          prefix="R$ "
          icon={<DollarSign size={20} className="text-success-500" />}
          change={4.3}
          changeText="desde o mês passado"
          iconBackground="bg-green-100 dark:bg-green-800"
        />
        
        <MetricsCard
          title="Despesas Totais"
          value={totalExpenses}
          prefix="R$ "
          icon={<CreditCard size={20} className="text-danger-500" />}
          change={2.8}
          changeText="desde o mês passado"
          iconBackground="bg-red-100 dark:bg-red-800"
        />
        
        <MetricsCard
          title="Saldo Atual"
          value={balance}
          prefix="R$ "
          icon={<Wallet size={20} className="text-info-500" />}
          iconBackground="bg-blue-100 dark:bg-blue-800"
        />
        
        <MetricsCard
          title="Total de Dízimos"
          value={tithesTotal}
          prefix="R$ "
          icon={<TrendingUp size={20} className="text-secondary-500" />}
          change={5.7}
          changeText="desde o mês passado"
          iconBackground="bg-secondary-100 dark:bg-secondary-800"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <ChartComponent
            title="Receitas e Despesas"
            description="Comparativo dos últimos 6 meses"
            chartData={mockFinanceChart}
            chartType="line"
          />
        </div>
        
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Relatórios Financeiros
          </h3>
          
          <div className="space-y-3">
            {[
              { name: 'Relatório Mensal', icon: <BarChart2 size={18} /> },
              { name: 'Relatório de Dízimos', icon: <PieChart size={18} /> },
              { name: 'Relatório Anual', icon: <BarChart2 size={18} /> },
              { name: 'Relatório de Categorias', icon: <PieChart size={18} /> },
            ].map((report, index) => (
              <div 
                key={index}
                className="flex items-center p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
              >
                <div className="p-2 rounded-full bg-primary-100 dark:bg-primary-800 text-primary-500 mr-3">
                  {report.icon}
                </div>
                <span className="flex-1 font-medium text-gray-700 dark:text-gray-200">
                  {report.name}
                </span>
                <Download size={16} className="text-gray-400" />
              </div>
            ))}
          </div>
          
          <button className="mt-4 w-full btn btn-outline">
            Gerar Novo Relatório
          </button>
        </div>
      </div>
      
      <div className="mb-6">
        <TransactionList
          transactions={mockTransactions}
          onAddTransaction={handleAddTransaction}
        />
      </div>
      
      {/* Add modal/form components for adding transactions */}
      {/* These would be implemented in a real application */}
    </div>
  );
};

export default Finance;