import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { TriangleAlert } from 'lucide-react';
import React from 'react';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
}

interface Props {
    product: Product;
}

export default function Edit({ product }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: product.name,
        price: product.price,
        description: product.description,
    });

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('products.update', product.id));
    };
    return (
        <AppLayout breadcrumbs={[{ title: 'Edit a Product', href: `products/$(product.id)/edit` }]}>
            <Head title="Update a Products" />
            <div className="w-8/12 p-4">
                <form onSubmit={handleUpdate} className="space-y-4">
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
                        Update Product
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
