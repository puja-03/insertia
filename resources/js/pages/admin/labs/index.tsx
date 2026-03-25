import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin/admin-layout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

type Lab = { id: number | string; name: string; code?: string; phone?: string; is_active?: boolean };

type Paginated<T> = { data: T[]; links?: Array<{ url: string | null; label: string; active: boolean }>; meta?: any };

type Props = { labs: Paginated<Lab>; filters?: { q?: string } };

export default function LabsIndex({ labs, filters = {} }: Props) {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<any | null>(null);

    const form = useForm({ name: '', code: '', phone: '', is_active: 1 });

    function openCreate() {
        setEditing(null);
        form.reset();
        setOpen(true);
    }

    function openEdit(lab: any) {
        setEditing(lab);
        form.setData({ name: lab.name || '', code: lab.code || '', phone: lab.phone || '', is_active: lab.is_active ? 1 : 0 });
        setOpen(true);
    }

    function submit(e: any) {
        e.preventDefault();
        if (editing) {
            form.put(`/admin/labs/${editing.id}`, { onSuccess: () => setOpen(false) });
        } else {
            form.post('/admin/labs', { onSuccess: () => setOpen(false) });
        }
    }

    return (
        <AdminLayout breadcrumbs={[{ title: 'Labs' }] }>
            <Head title="Labs" />

            <div className="mb-6 flex items-center justify-between p-4 rounded-md bg-white text-black">
                <div>
                    <h1 className="text-2xl font-semibold">Labs</h1>
                    <div className="text-sm text-muted-foreground">Manage labs</div>
                </div>

                <div className="flex items-center space-x-3">
                    <form method="get" action="/admin/labs" className="flex items-center space-x-2">
                        <input name="q" defaultValue={filters.q ?? ''} placeholder="Search labs" className="rounded-md border px-3 py-2" />
                        <Button type="submit" variant="secondary">Filter</Button>
                    </form>

                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={openCreate}>Create lab</Button>
                        </DialogTrigger>

                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{editing ? 'Edit lab' : 'Create lab'}</DialogTitle>
                                <DialogDescription>{editing ? 'Update lab details' : 'Create a new lab'}</DialogDescription>
                            </DialogHeader>

                            <form onSubmit={submit} className="grid gap-4">
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" name="name" value={form.data.name} onChange={(e: any) => form.setData('name', e.target.value)} required />
                                </div>

                                <div>
                                    <Label htmlFor="code">Code</Label>
                                    <Input id="code" name="code" value={form.data.code} onChange={(e: any) => form.setData('code', e.target.value)} />
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
                            <th className="px-4 py-2">Code</th>
                            <th className="px-4 py-2">Phone</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {labs.data.map((l) => (
                            <tr key={l.id} className="border-t">
                                <td className="px-4 py-3">{l.name}</td>
                                <td className="px-4 py-3">{l.code}</td>
                                <td className="px-4 py-3">{l.phone}</td>
                                <td className="px-4 py-3 space-x-2">
                                    <Button variant="secondary" onClick={() => openEdit(l)}>Edit</Button>
                                    <form action={`/admin/labs/${l.id}`} method="post" className="inline-block">
                                        <input type="hidden" name="_method" value="delete" />
                                        <Button type="submit" variant="destructive">Delete</Button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {labs.links && (
                <nav className="mt-4">
                    <ul className="inline-flex items-center space-x-2">
                        {labs.links.map((link, idx) => (
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
