import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin/admin-layout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

type Role = {
    id: number | string;
    name: string;
    guard_name?: string;
};

type Paginated<T> = {
    data: T[];
    links?: Array<{ url: string | null; label: string; active: boolean }>;
    meta?: any;
};

type Props = {
    roles: Paginated<Role>;
    filters?: { q?: string; is_system?: string };
};

export default function RolesIndex({ roles, filters = {} }: Props) {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<any | null>(null);

    const form = useForm({ name: '', slug: '', description: '', is_system: 0 });

    const slugify = (v: string) =>
        v
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');

    function openCreate() {
        setEditing(null);
        form.reset();
        setOpen(true);
    }

    function openEdit(role: any) {
        setEditing(role);
        form.setData({
            name: role.name || '',
            slug: role.slug || '',
            description: role.description || '',
            is_system: role.is_system ? 1 : 0,
        });
        setOpen(true);
    }

    function submit(e: any) {
        e.preventDefault();
        if (editing) {
            form.put(`/admin/roles/${editing.id}`, {
                onSuccess: () => setOpen(false),
            });
        } else {
            form.post('/admin/roles', {
                onSuccess: () => setOpen(false),
            });
        }
    }

    return (
        <AdminLayout breadcrumbs={[{ title: 'Roles' }] }>
            <Head title="Roles" />

            <div className="mb-6 flex items-center justify-between p-4 rounded-md bg-white text-black">
                <div>
                    <h1 className="text-2xl font-semibold">Roles</h1>
                    <div className="text-sm text-muted-foreground">Manage application roles</div>
                </div>

                <div className="flex items-center space-x-3">
                    <form method="get" action="/admin/roles" className="flex items-center space-x-2">
                        <input name="q" defaultValue={filters.q ?? ''} placeholder="Search roles" className="rounded-md border px-3 py-2" />
                        <select name="is_system" defaultValue={filters.is_system ?? ''} className="rounded-md border px-2 py-2">
                            <option value="">All</option>
                            <option value="1">System</option>
                            <option value="0">Custom</option>
                        </select>
                        <Button type="submit" variant="secondary">Filter</Button>
                    </form>

                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={openCreate}>Create role</Button>
                        </DialogTrigger>

                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{editing ? 'Edit role' : 'Create role'}</DialogTitle>
                                <DialogDescription>{editing ? 'Update role details' : 'Create a new role'}</DialogDescription>
                            </DialogHeader>

                            <form onSubmit={submit} className="grid gap-4">
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={form.data.name}
                                        onChange={(e: any) => {
                                            form.setData('name', e.target.value);
                                            // auto-generate slug when user types name
                                            form.setData('slug', slugify(e.target.value));
                                        }}
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="slug">Slug</Label>
                                    <Input id="slug" name="slug" value={form.data.slug} onChange={(e: any) => form.setData('slug', e.target.value)} />
                                </div>

                                <div>
                                    <Label htmlFor="description">Description</Label>
                                    <Input id="description" name="description" value={form.data.description} onChange={(e: any) => form.setData('description', e.target.value)} />
                                </div>

                                <DialogFooter>
                                    <Button type="submit">{editing ? 'Save' : 'Create'}</Button>
                                    <DialogClose asChild>
                                        <Button variant="ghost">Cancel</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className="overflow-hidden rounded-md border bg-white text-black">
                <table className="w-full table-auto text-left">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Guard</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.data.map((r) => (
                            <tr key={r.id} className="border-t">
                                <td className="px-4 py-3">{r.name}</td>
                                <td className="px-4 py-3">{r.guard_name ?? 'web'}</td>
                                <td className="px-4 py-3 space-x-2">
                                    <Button variant="secondary" onClick={() => openEdit(r)}>Edit</Button>
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

            {roles.links && (
                <nav className="mt-4">
                    <ul className="inline-flex items-center space-x-2">
                        {roles.links.map((link, idx) => (
                            <li key={idx}>
                                {link.url ? (
                                    <Link href={link.url} className={link.active ? 'font-bold' : ''} dangerouslySetInnerHTML={{ __html: link.label }} />
                                ) : (
                                    <span dangerouslySetInnerHTML={{ __html: link.label }} className="text-muted-foreground" />
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </AdminLayout>
    );
}
