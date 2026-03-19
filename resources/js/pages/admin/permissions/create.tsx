import { Head } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form } from '@inertiajs/react';

export default function PermissionCreate() {
    return (
        <AdminLayout breadcrumbs={[{ title: 'Permissions', href: '/admin/permissions' }, { title: 'Create' }]}>
            <Head title="Create Permission" />

            <h1 className="text-2xl font-semibold mb-4">Create Permission</h1>

            <Form action="/admin/permissions" method="post" className="space-y-4">
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" required />
                </div>

                <div>
                    <Label htmlFor="slug">Slug</Label>
                    <Input id="slug" name="slug" required />
                </div>

                <div>
                    <Label htmlFor="group">Group</Label>
                    <Input id="group" name="group" />
                </div>

                <div>
                    <Label htmlFor="description">Description</Label>
                    <Input id="description" name="description" />
                </div>

                <Button type="submit">Create</Button>
            </Form>
        </AdminLayout>
    );
}
