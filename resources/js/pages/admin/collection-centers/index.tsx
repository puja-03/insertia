import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin/admin-layout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

type Center = { id: number | string; name: string; address?: string; phone?: string };

type Paginated<T> = { data: T[]; links?: Array<{ url: string | null; label: string; active: boolean }>; meta?: any };

type Props = { centers: Paginated<Center>; filters?: { q?: string; lab_id?: string } };

export default function CollectionCentersIndex({ centers, filters = {} }: Props) {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<any | null>(null);

    const form = useForm({ name: '', address: '', phone: '', lab_id: '' });

    function openCreate() {
        setEditing(null);
        form.reset();
        setOpen(true);
    }

    function openEdit(c: any) {
        setEditing(c);
        form.setData({ name: c.name || '', address: c.address || '', phone: c.phone || '', lab_id: c.lab_id || '' });
        setOpen(true);
    }

    function submit(e: any) {
        e.preventDefault();
        if (editing) {
            form.put(`/admin/collection-centers/${editing.id}`, { onSuccess: () => setOpen(false) });
        } else {
            form.post('/admin/collection-centers', { onSuccess: () => setOpen(false) });
        }
    }

    return (
        <AdminLayout breadcrumbs={[{ title: 'Collection Centers' }] }>
            <Head title="Collection Centers" />

            <div className="mb-6 flex items-center justify-between p-4 rounded-md bg-white text-black">
                <div>
                    <h1 className="text-2xl font-semibold">Collection Centers</h1>
                    <div className="text-sm text-muted-foreground">Manage collection centers</div>
                </div>

                <div className="flex items-center space-x-3">
                    <form method="get" action="/admin/collection-centers" className="flex items-center space-x-2">
                        <input name="q" defaultValue={filters.q ?? ''} placeholder="Search centers" className="rounded-md border px-3 py-2" />
                        <Button type="submit" variant="secondary">Filter</Button>
                    </form>

                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={openCreate}>Create center</Button>
                        </DialogTrigger>

                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{editing ? 'Edit center' : 'Create center'}</DialogTitle>
                                <DialogDescription>{editing ? 'Update center details' : 'Create a new center'}</DialogDescription>
                            </DialogHeader>

                            <form onSubmit={submit} className="grid gap-4">
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" name="name" value={form.data.name} onChange={(e: any) => form.setData('name', e.target.value)} required />
                                </div>

                                <div>
                                    <Label htmlFor="address">Address</Label>
                                    <Input id="address" name="address" value={form.data.address} onChange={(e: any) => form.setData('address', e.target.value)} />
                                </div>

                                <div>
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input id="phone" name="phone" value={form.data.phone} onChange={(e: any) => form.setData('phone', e.target.value)} />
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
                            <th className="px-4 py-2">Address</th>
                            <th className="px-4 py-2">Phone</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {centers.data.map((c) => (
                            <tr key={c.id} className="border-t">
                                <td className="px-4 py-3">{c.name}</td>
                                <td className="px-4 py-3">{c.address}</td>
                                <td className="px-4 py-3">{c.phone}</td>
                                <td className="px-4 py-3 space-x-2">
                                    <Button variant="secondary" onClick={() => openEdit(c)}>Edit</Button>
                                    <form action={`/admin/collection-centers/${c.id}`} method="post" className="inline-block">
                                        <input type="hidden" name="_method" value="delete" />
                                        <Button type="submit" variant="destructive">Delete</Button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {centers.links && (
                <nav className="mt-4">
                    <ul className="inline-flex items-center space-x-2">
                        {centers.links.map((link, idx) => (
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
