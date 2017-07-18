# EdgeRouter-Recovery

Often when replacing the USB flash in an ERLITE-3, the flash will "not work" because of insufficient time on boot. The following commands at U-Boot will extend this time and allow any USB storage device to work:
```
setenv oldbootcmd 'fatload usb 0 $loadaddr vmlinux.64;bootoctlinux $loadaddr coremask=0x3 root=/dev/sda2 rootdelay=15 rw rootsqimg=squashfs.img rootsqwdir=w mtdparts=phys_mapped_flash:512k(boot0),512k(boot1),64k@3072k(eeprom)'
setenv bootcmd 'sleep 1; usb reset; sleep 1; $(oldbootcmd)'
setenv bootdelay 0
saveenv
```

Install a TFTP Server on a computer attached to the local network, or direct to eth0. Use the emrk from http://packages.vyos.net/tools/emrk/0.9c/ and host the emrk-0.9c.bin file in your TFTP server. Use the following commands to boot:

```
set ipaddr <free ip on local network>
set netmask <subnet octets for local network>
set gatewayip <router ip, must be on another routed network to download firmware!>
set serverip <ip of computer hosting the TFTP file>
set bootfile emrk-0.9c.bin
tftpboot
bootoctlinux $loadaddr
```

When selecting the full recovery, requiring the download of the firmware image, this image does not have updated HTTPS certs. In this case, just append -k to the end of the URL. The downloader uses CURL and this will bypass HTTPS verification. Download might be very slow, depending on your temporary network configuration.
