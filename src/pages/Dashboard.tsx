import React, { useState, useEffect } from 'react';
import { 
  Users, DollarSign, CalendarDays, Package, 
  TrendingUp, ArrowUpRight, PieChart, BarChart2
} from 'lucide-react';
import MetricsCard from '../components/dashboard/MetricsCard';
import ChartComponent from '../components/dashboard/ChartComponent';
import { useSupabase } from '../hooks/useSupabase';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalMembers: 0,
    totalIncome: 0,
    upcomingEvents: 0,
    lowStockItems: 0,
  });

  const [membershipData, setMembershipData] = useState({
    labels: [],
    datasets: [{
      label: 'Novos Membros',
      data: [],
      backgroundColor: 'rgba(0, 59, 77, 0.7)',
    }],
  });

  const [financeData, setFinanceData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Receitas',
        data: [],
        borderColor: 'rgba(212, 175, 55, 0.7)',
        backgroundColor: 'rgba(212, 175, 55, 0.2)',
      },
      {
        label: 'Despesas',
        data: [],
        borderColor: 'rgba(239, 68, 68, 0.7)',
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
      },
    ],
  });

  const [attendanceData, setAttendanceData] = useState({
    labels: ['Domingo', 'Quarta', 'Sexta', 'Células', 'Jovens'],
    datasets: [{
      label: 'Presenças',
      data: [0, 0, 0, 0, 0],
      backgroundColor: [
        'rgba(0, 59, 77, 0.8)',
        'rgba(212, 175, 55, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
      ],
    }],
  });

  const { supabase } = useSupabase();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Load members count
      const { count: membersCount } = await supabase
        .from('members')
        .select('*', { count: 'exact' });

      // Load financial data
      const { data: transactions } = await supabase
        .from('transactions')
        .select('*')
        .order('date', { ascending: false });

      // Load inventory data
      const { data: inventory } = await supabase
        .from('inventory_items')
        .select('*')
        .eq('status', 'low');

      // Calculate totals
      const totalIncome = transactions
        ?.filter(t => t.type !== 'expense')
        .reduce((sum, t) => sum + t.amount, 0) || 0;

      // Update stats
      setStats({
        totalMembers: membersCount || 0,
        totalIncome,
        upcomingEvents: 0, // To be implemented with events table
        lowStockItems: inventory?.length || 0,
      });

      // Update charts data
      updateChartsData(transactions);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  const updateChartsData = (transactions: any[]) => {
    // Get last 6 months
    const months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      return date.toLocaleString('pt-BR', { month: 'short' });
    }).reverse();

    // Calculate monthly totals
    const monthlyIncome = new Array(6).fill(0);
    const monthlyExpenses = new Array(6).fill(0);

    transactions?.forEach(transaction => {
      const transactionDate = new Date(transaction.date);
      const monthIndex = months.findIndex(month => 
        month === transactionDate.toLocaleString('pt-BR', { month: 'short' })
      );

      if (monthIndex !== -1) {
        if (transaction.type === 'expense') {
          monthlyExpenses[monthIndex] += transaction.amount;
        } else {
          monthlyIncome[monthIndex] += transaction.amount;
        }
      }
    });

    setFinanceData({
      labels: months,
      datasets: [
        {
          label: 'Receitas',
          data: monthlyIncome,
          borderColor: 'rgba(212, 175, 55, 0.7)',
          backgroundColor: 'rgba(212, 175, 55, 0.2)',
        },
        {
          label: 'Despesas',
          data: monthlyExpenses,
          borderColor: 'rgba(239, 68, 68, 0.7)',
          backgroundColor: 'rgba(239, 68, 68, 0.2)',
        },
      ],
    });
  };

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
          value={stats.totalMembers}
          icon={<Users size={20} className="text-primary-500" />}
          iconBackground="bg-primary-100 dark:bg-primary-800"
        />
        
        <MetricsCard
          title="Receitas Mensais"
          value={stats.totalIncome}
          prefix="R$ "
          icon={<DollarSign size={20} className="text-secondary-500" />}
          iconBackground="bg-secondary-100 dark:bg-secondary-800"
        />
        
        <MetricsCard
          title="Eventos Futuros"
          value={stats.upcomingEvents}
          icon={<CalendarDays size={20} className="text-info-500" />}
          iconBackground="bg-blue-100 dark:bg-blue-800"
        />
        
        <MetricsCard
          title="Itens com Estoque Baixo"
          value={stats.lowStockItems}
          icon={<Package size={20} className="text-warning-500" />}
          iconBackground="bg-yellow-100 dark:bg-yellow-800"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartComponent
          title="Receitas e Despesas"
          description="Comparativo dos últimos 6 meses"
          chartData={financeData}
          chartType="line"
        />
        
        <ChartComponent
          title="Crescimento de Membros"
          description="Novos membros nos últimos 6 meses"
          chartData={membershipData}
          chartType="bar"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartComponent
          title="Presenças por Evento"
          description="Média de presenças por tipo de evento"
          chartData={attendanceData}
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