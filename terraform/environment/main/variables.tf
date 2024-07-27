variable "tags" {
  default = {
    "Environment" = "production"
    "Owner"       = "sdupegui"
  }
}

variable "environment" {
  default = "production"
}

variable "suffix" {
  default = "sdupegui-js-application"
}