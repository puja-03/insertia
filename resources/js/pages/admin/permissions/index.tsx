import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin/admin-layout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

type Permission = {
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
    permissions: Paginated<Permission>;
    filters?: { q?: string };
};

export default function PermissionsIndex({ permissions, filters = {} }: Props) {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<any | null>(null);

    const form = useForm({ name: '', slug: '', description: '' });

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

    function openEdit(permission: any) {
        setEditing(permission);
        form.setData({
            name: permission.name || '',
            slug: permission.slug || '',
            description: permission.description || '',
        });
        setOpen(true);
    }

    function submit(e: any) {
        e.preventDefault();
        if (editing) {
            form.put(`/admin/permissions/${editing.id}`, { onSuccess: () => setOpen(false) });
        } else {
            form.post('/admin/permissions', { onSuccess: () => setOpen(false) });
        }
    }

    return (
        <AdminLayout breadcrumbs={[{ title: 'Permissions' }] }>
            <Head title="Permissions" />

            <div className="mb-6 flex items-center justify-between  p-4 rounded-md bg-white text-black">
                <div>
                    <h1 className="text-2xl font-semibold">Permissions</h1>
                    <div className="text-sm text-muted-foreground">Manage application permissions</div>
                </div>

                <div className="flex items-center space-x-3">
                    <form method="get" action="/admin/permissions" className="flex items-center space-x-2">
                        <input name="q" defaultValue={filters.q ?? ''} placeholder="Search permissions" className="rounded-md border px-3 py-2" />
                        <Button type="submit" variant="secondary">Filter</Button>
                    </form>

                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={openCreate}>Create permission</Button>
                        </DialogTrigger>

                        <DialogContent className="bg-muted text-muted-foreground">
                            <DialogHeader>
                                <DialogTitle>{editing ? 'Edit permission' : 'Create permission'}</DialogTitle>
                                <DialogDescription>{editing ? 'Update permission details' : 'Create a new permission'}</DialogDescription>
                            </DialogHeader>

                            <form onSubmit={submit} className="grid gap-4">
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" name="name" value={form.data.name} onChange={(e: any) => { form.setData('name', e.target.value); form.setData('slug', slugify(e.target.value)); }} required />
                                </div>

                                <div>
                                    <Label htmlFor="slug">Slug</Label>
                                    <Input id="slug" name="slug" value={form.data.slug} onChange={(e: any) => form.setData('slug', e.target.value)} />
                                </div>

                                {/* group removed per request */}

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
                        {permissions.data.map((p) => (
                            <tr key={p.id} className="border-t">
                                <td className="px-4 py-3">{p.name}</td>
                                <td className="px-4 py-3">{p.guard_name ?? 'web'}</td>
                                <td className="px-4 py-3 space-x-2">
                                    <Button variant="secondary" onClick={() => openEdit(p)}>Edit</Button>
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

            {permissions.links && (
                <nav className="mt-4">
                    <ul className="inline-flex items-center space-x-2">
                        {permissions.links.map((link, idx) => (
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
