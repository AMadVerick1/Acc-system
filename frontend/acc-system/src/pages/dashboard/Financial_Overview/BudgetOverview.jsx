import '../styles.css';
import React, { useState, useEffect } from 'react';
import { useBudget } from '../../../context/budgetContext';
import BudgetList from '../../../components/common/budget_list/Budget_List';
import BudgetSummary from '../../../components/common/metrics/BudgetSummary';
import BudgetItemsTable from '../../../components/common/tables/BudgetTable';
import BudgetAlert from '../../../components/common/notifications/budgetAlerts';
import AddBudgetItemModal from '../../../components/common/modals/BudgetItemsModal';
import BudgetProgress from '../../../components/common/notifications/budgetProgress';

export default function BudgetOverview() {
    const { budgetItems, fetchBudgetOverview, addBudget, editBudgetItem, removeBudgetItem, error } = useBudget();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedBudget, setSelectedBudget] = useState(null); // Track the selected budget for the overview sections

    useEffect(() => {
        console.log("Fetching budget overview...");
        fetchBudgetOverview();
    }, []);

    const addOrEditBudgetItem = async (item) => {
        if (isEditing && currentItem) {
            console.log(`Editing budget item with ID: ${currentItem._id}`, item);
            await editBudgetItem(currentItem._id, item);
        } else {
            console.log("Adding new budget item:", item);
            await addBudget(item);
        }
        resetModal();
    };

    const editBudgetItemHandler = (item) => {
        console.log("Editing budget item:", item);
        setCurrentItem(item);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        console.log(`Deleting budget item with ID: ${id}`);
        await removeBudgetItem(id);
    };

    const resetModal = () => {
        console.log("Resetting modal state...");
        setIsEditing(false);
        setCurrentItem(null);
        setIsModalOpen(false);
    };

    const [totalBudget, setTotalBudget] = useState(0);
    const [totalAllocated, setTotalAllocated] = useState(0);
    const [remainingBudget, setRemainingBudget] = useState(0);

    useEffect(() => {
        console.log("Budget items changed:", budgetItems);
        if (budgetItems.length > 0) {
            const totalBudget = budgetItems.reduce((acc, item) => acc + item.totalAmount, 0);
            const totalAllocated = budgetItems.reduce((acc, item) => acc + item.allocatedAmount, 0);
            const remainingBudget = totalBudget - totalAllocated;

            console.log("Total Budget:", totalBudget);
            console.log("Total Allocated:", totalAllocated);
            console.log("Remaining Budget:", remainingBudget);

            setTotalBudget(totalBudget);
            setTotalAllocated(totalAllocated);
            setRemainingBudget(remainingBudget);
        }
    }, [budgetItems]);

    return (
        <div className="budget-overview">
            <div className="col-1">
                {/* Budget List */}
                <BudgetList budgets={budgetItems} onSelectBudget={(budget) => {
                    console.log("Selected budget:", budget);
                    setSelectedBudget(budget);
                }} />
            </div>

            <div className="col-2">
                <h2>Budget Overview</h2>

                {error && <p className="error-message">{error}</p>}

                {selectedBudget && (
                    <>
                        {/* Budget Summary */}
                        <BudgetSummary budget={selectedBudget} />

                        {/* Budget Progress */}
                        <BudgetProgress budget={selectedBudget} />

                        {/* Budget Alerts */}
                        <BudgetAlert budget={selectedBudget} />
                    </>
                )}

                <div className="budget-metrics">
                    <p>Total Budget: {totalBudget}</p>
                    {/* <p>Allocated: {totalAllocated}</p>
                    <p>Remaining: {remainingBudget}</p> */}
                </div>

                <button className="btn-add" onClick={() => {
                    console.log("Opening modal to", isEditing ? "edit" : "add", "budget item.");
                    setIsModalOpen(true);
                }}>
                    + {isEditing ? 'Edit Budget Item' : 'Add Budget Item'}
                </button>

                <AddBudgetItemModal
                    isOpen={isModalOpen}
                    onClose={resetModal}
                    onAdd={addOrEditBudgetItem}
                    initialData={isEditing ? currentItem : null}
                />

                {/* Budget Items Table */}
                <div className="budget-table-section">
                    <BudgetItemsTable
                        items={budgetItems}
                        onEdit={editBudgetItemHandler}
                        onDelete={handleDelete}
                    />
                </div>
            </div>
        </div>
    );
}
