resource "aws_s3_bucket" "stage-s3-bucket" {
  bucket = "stage-${var.suffix}"

  tags = var.tags
        
}