#!/bin/bash
#
# Linux Shell Scripting Tutorial 1.05r3, Summer-2002
#
# Written by Vivek G. Gite <vivek@nixcraft.com>
#
# Latest version can be found at http://www.nixcraft.com/
#
function cal()
{
   n1=$1
   op=$2
   n2=$3
   ans=0
   if [ $# -eq 3 ]; then
       ans=$(( $n1 $op $n2 ))
       echo "$n1 $op $n2 = $ans"
       return $ans
   else
      echo "Function cal requires atleast three args"
   fi
 return
}

 cal 5 + 10
 cal 10 - 2
 cal 10 / 2
 echo $? 

#
# ./ch.sh: vivek-tech.com to nixcraft.com referance converted using this tool
# See the tool at http://www.nixcraft.com/uniqlinuxfeatures/tools/
#
