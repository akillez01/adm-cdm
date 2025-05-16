import React from 'react';
import { 
  Users, DollarSign, CalendarDays, Package, 
  TrendingUp, ArrowUpRight, PieChart, BarChart2
} from 'lucide-react';
import MetricsCard from '../components/dashboard/MetricsCard';
import ChartComponent from '../components/dashboard/ChartComponent';
import { 
  mockDashboardStats, 
  mockMembershipChart, 
  mockFinanceChart, 
  mockAttendanceChart 
} from '../utils/mockData';

const Dashboard: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-display font-bold text-gray-800 dark:text-white mb-2">
          Dashboard
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Visão geral da igreja e métricas importantes.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricsCard
          title="Total de Membros"
          value={mockDashboardStats.totalMembers}
          icon={<Users size={20} className="text-primary-500" />}
          change={2.5}
          changeText="desde o mês passado"
          iconBackground="bg-primary-100 dark:bg-primary-800"
        />
        
        <MetricsCard
          title="Receitas Mensais"
          value={mockDashboardStats.totalIncome}
          prefix="R$ "
          icon={<DollarSign size={20} className="text-secondary-500" />}
          change={5.2}
          changeText="desde o mês passado"
          iconBackground="bg-secondary-100 dark:bg-secondary-800"
        />
        
        <MetricsCard
          title="Eventos Futuros"
          value={mockDashboardStats.upcomingEvents}
          icon={<CalendarDays size={20} className="text-info-500" />}
          iconBackground="bg-blue-100 dark:bg-blue-800"
        />
        
        <MetricsCard
          title="Itens com Estoque Baixo"
          value={mockDashboardStats.lowStockItems}
          icon={<Package size={20} className="text-warning-500" />}
          change={-2}
          changeText="desde o mês passado"
          iconBackground="bg-yellow-100 dark:bg-yellow-800"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartComponent
          title="Receitas e Despesas"
          description="Comparativo dos últimos 6 meses"
          chartData={mockFinanceChart}
          chartType="line"
        />
        
        <ChartComponent
          title="Crescimento de Membros"
          description="Novos membros nos últimos 6 meses"
          chartData={mockMembershipChart}
          chartType="bar"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartComponent
          title="Presenças por Evento"
          description="Média de presenças por tipo de evento"
          chartData={mockAttendanceChart}
          chartType="doughnut"
          className="lg:col-span-1"
        />
        
        <div className="card lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Atividades Recentes
          </h3>
          
          <div className="space-y-4">
            {[
              { 
                icon: <Users size={16} />, 
                color: 'bg-primary-100 text-primary-500 dark:bg-primary-800', 
                title: 'Novo membro registrado', 
                description: 'Ana Costa foi adicionada como visitante', 
                time: '5 minutos atrás' 
              },
              { 
                icon: <DollarSign size={16} />, 
                color: 'bg-secondary-100 text-secondary-500 dark:bg-secondary-800', 
                title: 'Nova transação', 
                description: 'Dízimo de R$ 500,00 recebido', 
                time: '30 minutos atrás' 
              },
              { 
                icon: <CalendarDays size={16} />, 
                color: 'bg-blue-100 text-blue-500 dark:bg-blue-800', 
                title: 'Evento adicionado', 
                description: 'Encontro de Jovens programado', 
                time: '2 horas atrás' 
              },
              { 
                icon: <Package size={16} />, 
                color: 'bg-yellow-100 text-yellow-500 dark:bg-yellow-800', 
                title: 'Alerta de estoque', 
                description: 'Material de Limpeza abaixo do mínimo', 
                time: '5 horas atrás' 
              },
            ].map((activity, index) => (
              <div key={index} className="flex">
                <div className={`p-2 rounded-full ${activity.color} mr-3`}>
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800 dark:text-white">
                    {activity.title}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <button className="mt-4 text-primary-500 hover:text-primary-600 text-sm font-medium flex items-center">
            Ver todas as atividades
            <ArrowUpRight size={14} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;