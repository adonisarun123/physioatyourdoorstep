import { Button } from "@/components/ui/button";
import CTABar from "@/components/CTABar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { trpc } from "@/lib/trpc";
import { Calendar, Tag } from "lucide-react";
import { Link, useParams } from "wouter";

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: blog, isLoading } = trpc.blogs.getBySlug.useQuery({ slug: slug || "" });
  const { data: category } = trpc.categories.getBySlug.useQuery(
    { slug: "" },
    { enabled: false }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading article...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist.</p>
            <Button asChild>
              <Link href="/blogs">View All Articles</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
                {blog.categoryId && (
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    <span>Category</span>
                  </div>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{blog.title}</h1>
              {blog.excerpt && (
                <p className="text-xl text-muted-foreground">{blog.excerpt}</p>
              )}
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              {blog.content && (
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Professional Help?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our expert physiotherapists are here to help you with personalized treatment plans
              tailored to your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/booking">Book Consultation</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/blogs">Read More Articles</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <CTABar />
    </div>
  );
}
