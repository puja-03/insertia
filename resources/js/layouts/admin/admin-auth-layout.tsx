import AuthSimpleLayout from '@/layouts/auth/auth-simple-layout';
import type { AuthLayoutProps } from '@/types';

export default function AdminAuthLayout(props: AuthLayoutProps) {
    return <AuthSimpleLayout {...props} />;
}
