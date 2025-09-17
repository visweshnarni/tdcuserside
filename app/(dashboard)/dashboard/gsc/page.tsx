"use client";
import { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import GscFormDrawer from "@/app/components/dashboard/gsc/GscFormDrawer";
import GscDataTable from "@/app/components/dashboard/gsc/GscDataTable";
import { GscRecord } from "@/app/types/gsc";
import axios from "axios";

export default function GscPage() {
    const [data, setData] = useState<GscRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [editingRecord, setEditingRecord] = useState<Partial<GscRecord> | null>(null);

    const fetchGscData = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Authentication token not found. Please log in again.');
            setLoading(false);
            return;
        }
        
        try {
            const response = await axios.get('http://localhost:5000/api/certificates/gsc', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const responseData = response.data as { data: GscRecord[] };
            setData(responseData.data);
        } catch (err) {
            console.error('Failed to fetch GSC data:', err);
            setError('Failed to load GSC data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGscData();
    }, []);

    const onFormSubmit = async (formData: FormData, recordId?: string) => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Authentication token not found. Please log in again.');
            return;
        }

        try {
            if (recordId) {
                await axios.put(`http://localhost:5000/api/certificates/apply-gsc/${recordId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                    }
                });
            } else {
                await axios.post('http://localhost:5000/api/certificates/apply-gsc', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                    }
                });
            }
            
            setIsDrawerOpen(false);
            setEditingRecord(null);
            fetchGscData(); // Refresh the table with the new data
            alert('GSC application submitted successfully!');

        } catch (err) {
            if (err && typeof err === "object" && "response" in err && err.response && typeof err.response === "object" && "data" in err.response && err.response.data && typeof err.response.data === "object" && "error" in err.response.data) {
                // @ts-ignore
                console.error('Submission failed:', err.response.data.error);
                // @ts-ignore
                setError(err.response.data.error);
            } else if (err instanceof Error) {
                console.error('Submission failed:', err.message);
                setError('Failed to submit application.');
            } else {
                console.error('Submission failed:', err);
                setError('Failed to submit application.');
            }
        }
    };

    const handleNewApplication = () => {
        setEditingRecord(null);
        setIsDrawerOpen(true);
    };

    const handleEdit = (record: GscRecord) => {
        setEditingRecord(record);
        setIsDrawerOpen(true);
    };

    if (loading) return <div className="text-center py-10">Loading applications...</div>;
    if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

    return (
        <div>
            <h1 className="text-3xl font-semibold text-[#00694A] font-francois-one mb-6 pb-2 text-center">
                Good Standing Certificate
            </h1>
            <div className="flex justify-end mb-6">
                <Button onClick={handleNewApplication} className="bg-[#00694A] hover:bg-[#004d36] text-white cursor-pointer">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Apply for New GSC
                </Button>
            </div>
            
            <GscDataTable data={data} onEdit={handleEdit} />

            <GscFormDrawer
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                onSubmit={onFormSubmit}
                defaultValues={editingRecord ?? undefined}
            />
        </div>
    );
}