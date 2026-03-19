import { Head } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form } from '@inertiajs/react';

export default function RoleEdit({ role }: { role: any }) {
    return (
        <AdminLayout breadcrumbs={[{ title: 'Roles', href: '/admin/roles' }, { title: 'Edit' }]}>
            <Head title="Edit Role" />

            <h1 className="text-2xl font-semibold mb-4">Edit Role</h1>

            <Form action={`/admin/roles/${role.id}`} method="post" className="space-y-4">
                <input type="hidden" name="_method" value="put" />

                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" defaultValue={role.name} required />
                </div>

                <div>
                    <Label htmlFor="slug">Slug</Label>
                    <Input id="slug" name="slug" defaultValue={role.slug} required />
                </div>

                <div>
                    <Label htmlFor="description">Description</Label>
                    <Input id="description" name="description" defaultValue={role.description} />
                </div>

                <Button type="submit">Save</Button>
            </Form>
        </AdminLayout>
    );
}
