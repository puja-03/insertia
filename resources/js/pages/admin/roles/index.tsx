import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin/admin-layout';
import { Button } from '@/components/ui/button';

type Role = {
    id: number | string;
    name: string;
    guard_name?: string;
};

type Props = {
    roles?: Role[];
};

export default function RolesIndex({ roles = [] }: Props) {
    return (
        <AdminLayout breadcrumbs={[{ title: 'Roles' }] }>
            <Head title="Roles" />

            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Roles</h1>
                <Link href="/admin/roles/create">
                    <Button>Create role</Button>
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
                        {roles.map((r) => (
                            <tr key={r.id} className="border-t">
                                <td className="px-4 py-3">{r.name}</td>
                                <td className="px-4 py-3">{r.guard_name ?? 'web'}</td>
                                <td className="px-4 py-3 space-x-2">
                                    <Link href={`/admin/roles/${r.id}/edit`}>
                                        <Button variant="secondary">Edit</Button>
                                    </Link>
                                    <form action={`/admin/roles/${r.id}`} method="post" className="inline-block">
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
