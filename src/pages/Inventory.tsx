import React, { useState } from 'react';
import { 
  Package, AlertTriangle, ShoppingCart
} from 'lucide-react';
import InventoryList from '../components/inventory/InventoryList';
import InventoryForm from '../components/inventory/InventoryForm';
import Modal from '../components/ui/Modal';
import MetricsCard from '../components/dashboard/MetricsCard';
import { mockInventory } from '../utils/mockData';
import { InventoryItem } from '../types';

const Inventory: React.FC = () => {
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [inventory, setInventory] = useState(mockInventory);

  const handleAddItem = () => {
    setIsAddingItem(true);
    setSelectedItem(null);
  };

  const handleEditItem = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsAddingItem(true);
  };

  const handleCloseModal = () => {
    setIsAddingItem(false);
    setSelectedItem(null);
  };

  const handleSubmit = (data: Partial<InventoryItem>) => {
    if (selectedItem) {
      // Update existing item
      setInventory(prev => prev.map(item => 
        item.id === selectedItem.id ? { ...item, ...data } : item
      ));
    } else {
      // Add new item
      const newItem: InventoryItem = {
        id: String(Date.now()),
        name: data.name!,
        category: data.category!,
        quantity: data.quantity!,
        location: data.location!,
        value: data.value!,
        supplier: data.supplier,
        purchaseDate: data.purchaseDate,
        minQuantity: data.minQuantity,
        status: data.status! as 'available' | 'low' | 'depleted',
        notes: data.notes,
      };
      setInventory(prev => [...prev, newItem]);
    }
    handleCloseModal();
  };

  // Calculate inventory metrics
  const totalItems = inventory.reduce((sum, item) => sum + item.quantity, 0);
  const totalValue = inventory.reduce((sum, item) => sum + (item.value * item.quantity), 0);
  const lowStockItems = inventory.filter(item => item.status === 'low').length;
  const categories = new Set(inventory.map(item => item.category)).size;

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-display font-bold text-gray-800 dark:text-white mb-2">
          Inventário
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Gerencie o controle de estoque, equipamentos e patrimônio.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricsCard
          title="Total de Itens"
          value={totalItems}
          icon={<Package size={20} className="text-primary-500" />}
          iconBackground="bg-primary-100 dark:bg-primary-800"
        />
        
        <MetricsCard
          title="Valor Total"
          value={totalValue}
          prefix="R$ "
          icon={<ShoppingCart size={20} className="text-secondary-500" />}
          iconBackground="bg-secondary-100 dark:bg-secondary-800"
        />
        
        <MetricsCard
          title="Itens com Estoque Baixo"
          value={lowStockItems}
          icon={<AlertTriangle size={20} className="text-warning-500" />}
          iconBackground="bg-yellow-100 dark:bg-yellow-800"
        />
        
        <MetricsCard
          title="Categorias"
          value={categories}
          icon={<Package size={20} className="text-info-500" />}
          iconBackground="bg-blue-100 dark:bg-blue-800"
        />
      </div>
      
      <div className="mb-6">
        <InventoryList
          items={inventory}
          onAddItem={handleAddItem}
          onEditItem={handleEditItem}
        />
      </div>
      
      <Modal
        isOpen={isAddingItem}
        onClose={handleCloseModal}
        title={selectedItem ? 'Editar Item' : 'Novo Item'}
        size="lg"
      >
        <InventoryForm
          item={selectedItem || undefined}
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default Inventory;