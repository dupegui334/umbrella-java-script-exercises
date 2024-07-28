resource "aws_s3_bucket" "web_app_s3_bucket" {
  bucket = "stage-${var.suffix}"

  tags = var.tags
}

output "bucket_name" {
  value = aws_s3_bucket.web_app_s3_bucket.bucket
}

resource "aws_s3_bucket_website_configuration" "web_app_s3_bucket_config" {
  bucket = aws_s3_bucket.web_app_s3_bucket.id

  index_document {
    suffix = "index.html"
  }
}

resource "aws_s3_bucket_public_access_block" "web_app_s3_public_access" {
  bucket = aws_s3_bucket.web_app_s3_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "allow_access_to_bucket_internet" {
  bucket = aws_s3_bucket.web_app_s3_bucket.id
  policy = data.aws_iam_policy_document.policy_allow_access_to_bucket_internet.json
}

data "aws_iam_policy_document" "policy_allow_access_to_bucket_internet" {
  statement {
    principals {
      type        = "*"
      identifiers = ["*"]    
    }

    actions = [
      "s3:GetObject",
      "s3:ListBucket",
    ]

    resources = [
      aws_s3_bucket.web_app_s3_bucket.arn,
      "${aws_s3_bucket.web_app_s3_bucket.arn}/*",
    ]
  }

  depends_on = [
    aws_s3_bucket.web_app_s3_bucket
  ]
}