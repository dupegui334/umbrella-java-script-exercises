variable "tags" {
  default = {
    "Environment" = "stage"
    "Owner"       = "sdupegui"
  }
}

variable "environment" {
  default = "stage"
}

variable "suffix" {
  default = "sdupegui-js-application"
}