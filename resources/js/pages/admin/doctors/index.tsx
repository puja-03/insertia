import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin/admin-layout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

type Doctor = { id: number | string; name: string; email?: string; phone?: string };

type Paginated<T> = { data: T[]; links?: Array<{ url: string | null; label: string; active: boolean }>; meta?: any };

type Props = { doctors: Paginated<Doctor>; filters?: { q?: string; lab_id?: string } };

export default function DoctorsIndex({ doctors, filters = {} }: Props) {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<any | null>(null);

    const form = useForm({ name: '', email: '', phone: '', lab_id: '' });

    function openCreate() {
        setEditing(null);
        form.reset();
        setOpen(true);
    }

    function openEdit(d: any) {
        setEditing(d);
        form.setData({ name: d.name || '', email: d.email || '', phone: d.phone || '', lab_id: d.lab_id || '' });
        setOpen(true);
    }

    function submit(e: any) {
        e.preventDefault();
        if (editing) {
            form.put(`/admin/doctors/${editing.id}`, { onSuccess: () => setOpen(false) });
        } else {
            form.post('/admin/doctors', { onSuccess: () => setOpen(false) });
        }
    }

    return (
        <AdminLayout breadcrumbs={[{ title: 'Doctors' }] }>
            <Head title="Doctors" />

            <div className="mb-6 flex items-center justify-between p-4 rounded-md bg-white text-black">
                <div>
                    <h1 className="text-2xl font-semibold">Doctors</h1>
                    <div className="text-sm text-muted-foreground">Manage doctors</div>
                </div>

                <div className="flex items-center space-x-3">
                    <form method="get" action="/admin/doctors" className="flex items-center space-x-2">
                        <input name="q" defaultValue={filters.q ?? ''} placeholder="Search doctors" className="rounded-md border px-3 py-2" />
                        <Button type="submit" variant="secondary">Filter</Button>
                    </form>

                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={openCreate}>Create doctor</Button>
                        </DialogTrigger>

                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{editing ? 'Edit doctor' : 'Create doctor'}</DialogTitle>
                                <DialogDescription>{editing ? 'Update doctor details' : 'Create a new doctor'}</DialogDescription>
                            </DialogHeader>

                            <form onSubmit={submit} className="grid gap-4">
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" name="name" value={form.data.name} onChange={(e: any) => form.setData('name', e.target.value)} required />
                                </div>

                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" name="email" value={form.data.email} onChange={(e: any) => form.setData('email', e.target.value)} />
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
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Phone</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors.data.map((d) => (
                            <tr key={d.id} className="border-t">
                                <td className="px-4 py-3">{d.name}</td>
                                <td className="px-4 py-3">{d.email}</td>
                                <td className="px-4 py-3">{d.phone}</td>
                                <td className="px-4 py-3 space-x-2">
                                    <Button variant="secondary" onClick={() => openEdit(d)}>Edit</Button>
                                    <form action={`/admin/doctors/${d.id}`} method="post" className="inline-block">
                                        <input type="hidden" name="_method" value="delete" />
                                        <Button type="submit" variant="destructive">Delete</Button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {doctors.links && (
                <nav className="mt-4">
                    <ul className="inline-flex items-center space-x-2">
                        {doctors.links.map((link, idx) => (
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
