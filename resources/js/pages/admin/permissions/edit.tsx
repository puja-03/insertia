import { Head } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form } from '@inertiajs/react';

export default function PermissionEdit({ permission }: { permission: any }) {
    return (
        <AdminLayout breadcrumbs={[{ title: 'Permissions', href: '/admin/permissions' }, { title: 'Edit' }]}>
            <Head title="Edit Permission" />

            <h1 className="text-2xl font-semibold mb-4">Edit Permission</h1>

            <Form action={`/admin/permissions/${permission.id}`} method="post" className="space-y-4">
                <input type="hidden" name="_method" value="put" />

                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" defaultValue={permission.name} required />
                </div>

                <div>
                    <Label htmlFor="slug">Slug</Label>
                    <Input id="slug" name="slug" defaultValue={permission.slug} required />
                </div>

                <div>
                    <Label htmlFor="group">Group</Label>
                    <Input id="group" name="group" defaultValue={permission.group} />
                </div>

                <div>
                    <Label htmlFor="description">Description</Label>
                    <Input id="description" name="description" defaultValue={permission.description} />
                </div>

                <Button type="submit">Save</Button>
            </Form>
        </AdminLayout>
    );
}
