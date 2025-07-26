import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { TriangleAlert } from 'lucide-react';
import React from 'react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Products',
        href: '/Products/Create',
    },
];

export default function Index() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        price: '',
        description: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('products.store'));
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Products" />
            <div className="w-8/12 p-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* handle error */}
                    {Object.keys(errors).length > 0 && (
                        <Alert>
                            <TriangleAlert />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                                <ul>
                                    {Object.entries(errors).map(([key, message]) => (
                                        <li key={key}>{message as string}</li>
                                    ))}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}
                    <div className="gap-1.5">
                        <label htmlFor="Product name">Name</label>
                        <Input placeholder="Product name" value={data.name} onChange={(e) => setData('name', e.target.value)}></Input>
                    </div>

                    <div className="gap-1.5">
                        <label htmlFor="product price">Price</label>
                        <Input placeholder="Price" value={data.price} onChange={(e) => setData('price', e.target.value)}></Input>
                    </div>
                    <div className="gap-1.5">
                        <label htmlFor="product description">Description</label>
                        <Textarea
                            placeholder="Description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        ></Textarea>
                    </div>
                    <Button disabled={processing} type="submit">
                        Add Product
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
