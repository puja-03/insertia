import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin/admin-layout';
import { Button } from '@/components/ui/button';

type Permission = {
    id: number | string;
    name: string;
    guard_name?: string;
};

type Props = {
    permissions?: Permission[];
};

export default function PermissionsIndex({ permissions = [] }: Props) {
    return (
        <AdminLayout breadcrumbs={[{ title: 'Permissions' }] }>
            <Head title="Permissions" />

            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Permissions</h1>
                <Link href="/admin/permissions/create">
                    <Button>Create permission</Button>
                </Link>
            </div>

            <div className="overflow-hidden rounded-md border">
                <table className="w-full table-auto text-left">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Guard</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {permissions.map((p) => (
                            <tr key={p.id} className="border-t">
                                <td className="px-4 py-3">{p.name}</td>
                                <td className="px-4 py-3">{p.guard_name ?? 'web'}</td>
                                <td className="px-4 py-3 space-x-2">
                                    <Link href={`/admin/permissions/${p.id}/edit`}>
                                        <Button variant="secondary">Edit</Button>
                                    </Link>
                                    <form action={`/admin/permissions/${p.id}`} method="post" className="inline-block">
                                        <input type="hidden" name="_method" value="delete" />
                                        <Button type="submit" variant="destructive">Delete</Button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
