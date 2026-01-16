
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Database, Link as LinkIcon } from 'lucide-react';
import { ScrollAnimator } from '@/components/scroll-animator';
import { createSupabaseClient } from '@/lib/supabase';

export default function AdminDatabasePage() {
    const { toast } = useToast();
    const [supabaseUrl, setSupabaseUrl] = useState('');
    const [supabaseKey, setSupabaseKey] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleConnect = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!supabaseUrl || !supabaseKey) {
            toast({
                variant: 'destructive',
                title: 'Missing Credentials',
                description: 'Please provide both the Supabase URL and the Anon Key.',
            });
            return;
        }

        setIsLoading(true);
        toast({
            title: 'Connecting to Database',
            description: 'Attempting to establish a connection with Supabase...',
        });

        try {
            const supabase = createSupabaseClient(supabaseUrl, supabaseKey);
            // Test connection by trying to list storage buckets.
            const { error } = await supabase.storage.listBuckets();

            if (error) {
                throw error;
            }

            toast({
                title: 'Connection Successful!',
                description: 'Successfully connected to your Supabase instance.',
            });
        } catch (error: any) {
            console.error("Supabase connection error:", error);
            toast({
                variant: 'destructive',
                title: 'Connection Failed',
                description: error.message || 'An unknown error occurred. Check your console and credentials.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8 max-w-2xl mx-auto">
            <ScrollAnimator>
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Database className="h-8 w-8 text-accent" />
                        <h1 className="text-3xl font-headline font-bold text-foreground">Database Configuration</h1>
                    </div>
                    <p className="text-muted-foreground">
                        Connect the platform to your external Supabase database.
                    </p>
                </div>
            </ScrollAnimator>

            <ScrollAnimator>
                <Card>
                    <CardHeader>
                        <CardTitle>Supabase Connector</CardTitle>
                        <CardDescription>
                            Enter your Supabase project URL and public anon key to connect your database. You can find these in your Supabase project's API settings.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleConnect} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="supabaseUrl">Supabase URL</Label>
                                <Input
                                    id="supabaseUrl"
                                    type="url"
                                    placeholder="https://[your-project-ref].supabase.co"
                                    value={supabaseUrl}
                                    onChange={(e) => setSupabaseUrl(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="supabaseKey">Supabase Anon Key</Label>
                                <Input
                                    id="supabaseKey"
                                    type="password"
                                    placeholder="ey..."
                                    value={supabaseKey}
                                    onChange={(e) => setSupabaseKey(e.target.value)}
                                    required
                                />
                                <p className="text-xs text-muted-foreground">
                                    Your key is not stored. This page only tests the connection.
                                </p>
                            </div>
                            <Button type="submit" disabled={isLoading} className="w-full">
                                <LinkIcon className="mr-2 h-4 w-4" />
                                {isLoading ? 'Connecting...' : 'Connect to Supabase'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </ScrollAnimator>
        </div>
    );
}
