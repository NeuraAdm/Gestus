## Table `blog_posts`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `title` | `text` |  |
| `slug` | `text` |  Unique |
| `excerpt` | `text` |  Nullable |
| `content` | `text` |  |
| `cover_url` | `text` |  Nullable |
| `cover_alt` | `text` |  Nullable |
| `categories` | `_text` |  Nullable |
| `status` | `text` |  |
| `published_at` | `timestamptz` |  Nullable |
| `created_at` | `timestamptz` |  |
| `updated_at` | `timestamptz` |  Nullable |
| `author_name` | `text` |  Nullable |
| `seo_title` | `text` |  Nullable |
| `seo_description` | `text` |  Nullable |
| `og_image_url` | `text` |  Nullable |
| `media_urls` | `_text` |  Nullable |
